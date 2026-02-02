/**
 * ============================================================================
 * LEAD CAPTURE SYSTEM - TIER 2
 * ============================================================================
 * Purpose: Capture leads and send to Copper CRM + backup to database
 * 
 * Why both Copper AND database?
 * 1. Copper CRM - Primary lead management system
 * 2. Database - Backup in case Copper webhook fails
 * 3. Database - Analytics and reporting
 * 4. Database - Lead validation and deduplication
 * 
 * Features:
 * - Saves lead to Supabase KV store (backup)
 * - Sends lead to Copper CRM via webhook
 * - Validates and sanitizes input
 * - Prevents duplicate submissions
 * - Tracks lead source and form type
 * - Error handling and logging
 * 
 * Setup for coder:
 * 1. Get your Copper CRM webhook URL (or use n8n webhook)
 * 2. Update COPPER_WEBHOOK_URL below
 * 3. Test with a sample submission
 * 
 * ============================================================================
 */

import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const leads = new Hono();

// TODO: Replace with your Copper CRM webhook URL or n8n webhook URL
const COPPER_WEBHOOK_URL = 'https://your-copper-webhook-url.com/webhook';
// For n8n: 'https://your-n8n-instance.com/webhook/lead-capture'

/**
 * ============================================================================
 * POST /make-server-e8e0d145/leads
 * ============================================================================
 * Captures a new lead from website forms
 * 
 * Request body:
 * {
 *   name: string (required)
 *   email: string (required)
 *   phone?: string
 *   message?: string
 *   formType: 'quick_contact' | 'hero_chatbot' | 'calculator' | 'contact_page'
 *   leadSource?: string (e.g., 'website', 'landing_page')
 *   metadata?: object (any additional data)
 * }
 * ============================================================================
 */
leads.post('/', async (c) => {
  try {
    const body = await c.req.json();

    // ========== VALIDATE REQUIRED FIELDS ==========
    if (!body.name || !body.email) {
      return c.json(
        { error: 'Name and email are required' },
        400
      );
    }

    // ========== VALIDATE EMAIL FORMAT ==========
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return c.json(
        { error: 'Invalid email format' },
        400
      );
    }

    // ========== CREATE LEAD OBJECT ==========
    const lead = {
      id: crypto.randomUUID(),
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone?.trim() || null,
      message: body.message?.trim() || null,
      formType: body.formType || 'unknown',
      leadSource: body.leadSource || 'website',
      metadata: body.metadata || {},
      createdAt: new Date().toISOString(),
      sentToCopper: false,
      copperError: null,
    };

    // ========== CHECK FOR DUPLICATE WITHIN 24 HOURS ==========
    // Prevents spam/accidental double submissions
    const existingLeads = await kv.getByPrefix(`lead:${lead.email}:`);
    const recentLead = existingLeads.find((l: any) => {
      const createdAt = new Date(l.createdAt);
      const hoursSince = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
      return hoursSince < 24;
    });

    if (recentLead) {
      console.log(`Duplicate lead detected for ${lead.email} (within 24h)`);
      return c.json(
        {
          success: true,
          message: 'Thank you! We already have your information and will contact you soon.',
          duplicate: true
        },
        200
      );
    }

    // ========== SAVE TO DATABASE (BACKUP) ==========
    const dbKey = `lead:${lead.email}:${lead.id}`;
    await kv.set(dbKey, lead);
    console.log(`✅ Lead saved to database: ${dbKey}`);

    // ========== SEND TO COPPER CRM ==========
    try {
      // Prepare Copper-friendly payload
      const copperPayload = {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        form_type: lead.formType,
        lead_source: lead.leadSource,
        website: 'mortgagegenius.com',
        timestamp: lead.createdAt,
        metadata: lead.metadata,
      };

      // Send to Copper webhook
      const copperResponse = await fetch(COPPER_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(copperPayload),
      });

      if (copperResponse.ok) {
        // Update lead status
        lead.sentToCopper = true;
        await kv.set(dbKey, lead);
        console.log(`✅ Lead sent to Copper CRM: ${lead.email}`);
      } else {
        const errorText = await copperResponse.text();
        lead.copperError = `HTTP ${copperResponse.status}: ${errorText}`;
        await kv.set(dbKey, lead);
        console.error(`❌ Copper CRM error for ${lead.email}:`, lead.copperError);
      }
    } catch (copperError: any) {
      // Copper webhook failed, but lead is saved in database
      lead.copperError = copperError.message;
      await kv.set(dbKey, lead);
      console.error(`❌ Error sending to Copper CRM:`, copperError);
    }

    // ========== RETURN SUCCESS ==========
    return c.json({
      success: true,
      message: 'Thank you! We will contact you within 24 hours.',
      leadId: lead.id,
      sentToCopper: lead.sentToCopper,
    });

  } catch (error: any) {
    console.error('❌ Lead capture error:', error);
    return c.json(
      {
        error: 'Failed to process your request. Please try again or call us at (321) 555-0199.',
        details: error.message
      },
      500
    );
  }
});

/**
 * ============================================================================
 * GET /make-server-e8e0d145/leads
 * ============================================================================
 * Retrieve all leads (for admin dashboard)
 * Optional query params:
 * - limit: number of leads to return (default: 100)
 * - email: filter by email
 * ============================================================================
 */
leads.get('/', async (c) => {
  try {
    const email = c.req.query('email');
    const limit = parseInt(c.req.query('limit') || '100');

    let allLeads;

    if (email) {
      // Get leads for specific email
      allLeads = await kv.getByPrefix(`lead:${email}:`);
    } else {
      // Get all leads
      allLeads = await kv.getByPrefix('lead:');
    }

    // Sort by createdAt (newest first)
    allLeads.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Apply limit
    const limitedLeads = allLeads.slice(0, limit);

    return c.json({
      success: true,
      count: limitedLeads.length,
      total: allLeads.length,
      leads: limitedLeads,
    });

  } catch (error: any) {
    console.error('❌ Error fetching leads:', error);
    return c.json(
      {
        error: 'Failed to fetch leads',
        details: error.message
      },
      500
    );
  }
});

/**
 * ============================================================================
 * GET /make-server-e8e0d145/leads/stats
 * ============================================================================
 * Get lead statistics (for admin dashboard)
 * ============================================================================
 */
leads.get('/stats', async (c) => {
  try {
    const allLeads = await kv.getByPrefix('lead:');

    // Calculate stats
    const stats = {
      total: allLeads.length,
      sentToCopper: allLeads.filter((l: any) => l.sentToCopper).length,
      copperErrors: allLeads.filter((l: any) => l.copperError).length,
      byFormType: {} as Record<string, number>,
      bySource: {} as Record<string, number>,
      last24Hours: 0,
      last7Days: 0,
      last30Days: 0,
    };

    const now = Date.now();
    const day = 1000 * 60 * 60 * 24;

    allLeads.forEach((lead: any) => {
      // Count by form type
      stats.byFormType[lead.formType] = (stats.byFormType[lead.formType] || 0) + 1;
      
      // Count by source
      stats.bySource[lead.leadSource] = (stats.bySource[lead.leadSource] || 0) + 1;

      // Count by time period
      const createdAt = new Date(lead.createdAt).getTime();
      const daysSince = (now - createdAt) / day;

      if (daysSince < 1) stats.last24Hours++;
      if (daysSince < 7) stats.last7Days++;
      if (daysSince < 30) stats.last30Days++;
    });

    return c.json({
      success: true,
      stats,
    });

  } catch (error: any) {
    console.error('❌ Error fetching stats:', error);
    return c.json(
      {
        error: 'Failed to fetch statistics',
        details: error.message
      },
      500
    );
  }
});

export default leads;

/**
 * ============================================================================
 * INTEGRATION INSTRUCTIONS FOR CODER
 * ============================================================================
 * 
 * 1. Add to main server (index.tsx):
 *    import leads from './leads.tsx';
 *    app.route('/make-server-e8e0d145/leads', leads);
 * 
 * 2. Update COPPER_WEBHOOK_URL with your actual webhook:
 *    - Copper CRM: Get webhook URL from Copper settings
 *    - n8n: Create webhook node and use the URL
 *    - Zapier: Use Zapier webhook URL
 * 
 * 3. Frontend usage example:
 *    const response = await fetch(
 *      `https://${projectId}.supabase.co/functions/v1/make-server-e8e0d145/leads`,
 *      {
 *        method: 'POST',
 *        headers: {
 *          'Content-Type': 'application/json',
 *          'Authorization': `Bearer ${publicAnonKey}`
 *        },
 *        body: JSON.stringify({
 *          name: 'John Doe',
 *          email: 'john@example.com',
 *          phone: '555-1234',
 *          message: 'Interested in VA loan',
 *          formType: 'quick_contact',
 *          leadSource: 'website'
 *        })
 *      }
 *    );
 * 
 * 4. Test the endpoint:
 *    curl -X POST https://YOUR-PROJECT.supabase.co/functions/v1/make-server-e8e0d145/leads \
 *      -H "Content-Type: application/json" \
 *      -H "Authorization: Bearer YOUR-ANON-KEY" \
 *      -d '{"name":"Test","email":"test@example.com","formType":"quick_contact"}'
 * 
 * ============================================================================
 */
