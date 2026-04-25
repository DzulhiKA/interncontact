import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          university: string
          major: string
          skills: string[]
          avatar_url: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      internships: {
        Row: {
          id: string
          company_id: string
          title: string
          description: string
          requirements: string[]
          location: string
          salary_range: string | null
          deadline: string
          tags: string[]
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['internships']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['internships']['Insert']>
      }
      applications: {
        Row: {
          id: string
          user_id: string
          internship_id: string
          status: 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected'
          applied_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['applications']['Row'], 'id' | 'applied_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['applications']['Insert']>
      }
      companies: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          industry: string
          location: string
          description: string
          verified: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['companies']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['companies']['Insert']>
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          company_id: string
          rating: number
          review_text: string
          position: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>
      }
      portfolios: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          file_url: string | null
          type: 'project' | 'certificate' | 'achievement'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['portfolios']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['portfolios']['Insert']>
      }
    }
  }
}
