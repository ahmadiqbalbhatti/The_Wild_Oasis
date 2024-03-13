/* eslint-disable no-mixed-spaces-and-tabs */

import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ACCESS_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
export {supabaseUrl};
