import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qvcrluuvaonuknkyamaz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODg1NzcxMiwiZXhwIjoxOTQ0NDMzNzEyfQ.g3rWM1l6rx5X714ANc6u0QX9wSriSCcxvQ_rI8b4WMo'
);

export default supabase;
