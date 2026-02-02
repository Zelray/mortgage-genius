/**
 * ============================================================================
 * AUTHENTICATION ROUTES - TIER 3
 * ============================================================================
 * Admin authentication using Supabase Auth
 * Routes: /login, /verify
 * ============================================================================
 */

import { Hono } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2";

const auth = new Hono();

// Initialize Supabase client with service role for admin operations
const getSupabaseAdmin = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
};

const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );
};

/**
 * POST /login
 * Authenticate admin user
 */
auth.post("/", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ success: false, error: 'Email and password required' }, 400);
    }

    const supabase = getSupabaseClient();

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.session) {
      console.error('Login error:', error);
      return c.json({ success: false, error: 'Invalid credentials' }, 401);
    }

    // Get user metadata to check role
    const { data: userData } = await supabase.auth.getUser(data.session.access_token);
    const role = userData.user?.user_metadata?.role || 'editor';

    return c.json({
      success: true,
      accessToken: data.session.access_token,
      role: role
    });

  } catch (error) {
    console.error('Login error:', error);
    return c.json({ success: false, error: 'Login failed' }, 500);
  }
});

/**
 * POST /verify
 * Verify access token and return user info
 */
auth.post("/verify", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];

    if (!accessToken) {
      return c.json({ success: false, error: 'No token provided' }, 401);
    }

    const supabase = getSupabaseClient();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ success: false, error: 'Invalid token' }, 401);
    }

    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.user_metadata?.role || 'editor'
      }
    });

  } catch (error) {
    console.error('Verify error:', error);
    return c.json({ success: false, error: 'Verification failed' }, 500);
  }
});

/**
 * POST /create-admin
 * Create a new admin user (protected - requires admin role)
 */
auth.post("/create-admin", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];

    // Verify requesting user is admin
    const supabase = getSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);

    if (authError || !user || user.user_metadata?.role !== 'admin') {
      return c.json({ success: false, error: 'Unauthorized' }, 403);
    }

    const { email, password, name, role } = await c.req.json();

    if (!email || !password) {
      return c.json({ success: false, error: 'Email and password required' }, 400);
    }

    // Create new user with admin privileges
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name: name || email,
        role: role || 'editor'
      },
      email_confirm: true // Auto-confirm since we don't have email configured
    });

    if (error) {
      console.error('Create admin error:', error);
      return c.json({ success: false, error: error.message }, 400);
    }

    return c.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        role: role || 'editor'
      }
    });

  } catch (error) {
    console.error('Create admin error:', error);
    return c.json({ success: false, error: 'Failed to create user' }, 500);
  }
});

export default auth;
