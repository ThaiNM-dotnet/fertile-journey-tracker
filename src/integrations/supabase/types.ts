export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account: {
        Row: {
          account_id: string
          created_at: string | null
          is_active: boolean | null
          password_hash: string
          user_id: string | null
          username: string
        }
        Insert: {
          account_id: string
          created_at?: string | null
          is_active?: boolean | null
          password_hash: string
          user_id?: string | null
          username: string
        }
        Update: {
          account_id?: string
          created_at?: string | null
          is_active?: boolean | null
          password_hash?: string
          user_id?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          created_at: string | null
          doctor_name: string
          id: string
          notes: string | null
          payment_id: string | null
          service_type: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          created_at?: string | null
          doctor_name: string
          id?: string
          notes?: string | null
          payment_id?: string | null
          service_type: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          created_at?: string | null
          doctor_name?: string
          id?: string
          notes?: string | null
          payment_id?: string | null
          service_type?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          content: string | null
          created_at: string | null
          manager_id: string | null
          post_id: string
          title: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          manager_id?: string | null
          post_id: string
          title?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          manager_id?: string | null
          post_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
        ]
      }
      booking: {
        Row: {
          booking_date: string | null
          booking_id: string
          customer_id: string
          note: string | null
          service_id: string
          status: string | null
          work_id: string
        }
        Insert: {
          booking_date?: string | null
          booking_id: string
          customer_id: string
          note?: string | null
          service_id: string
          status?: string | null
          work_id: string
        }
        Update: {
          booking_date?: string | null
          booking_id?: string
          customer_id?: string
          note?: string | null
          service_id?: string
          status?: string | null
          work_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "booking_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "treatment_services"
            referencedColumns: ["service_id"]
          },
          {
            foreignKeyName: "booking_work_id_fkey"
            columns: ["work_id"]
            isOneToOne: false
            referencedRelation: "workschedule"
            referencedColumns: ["work_id"]
          },
        ]
      }
      consultations: {
        Row: {
          created_at: string | null
          id: string
          message: string
          response: string | null
          status: string | null
          subject: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          response?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          response?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      examination: {
        Row: {
          booking_id: string
          diagnosis: string | null
          exam_date: string | null
          exam_id: string
          recommendation: string | null
        }
        Insert: {
          booking_id: string
          diagnosis?: string | null
          exam_date?: string | null
          exam_id: string
          recommendation?: string | null
        }
        Update: {
          booking_id?: string
          diagnosis?: string | null
          exam_date?: string | null
          exam_id?: string
          recommendation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "examination_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "booking"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      feedback_ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          customer_id: string | null
          feedback_id: string
          rating: number | null
          staff_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string | null
          feedback_id: string
          rating?: number | null
          staff_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string | null
          feedback_id?: string
          rating?: number | null
          staff_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_ratings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "feedback_ratings_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
        ]
      }
      invoice: {
        Row: {
          booking_id: string | null
          invoice_id: string
          issued_date: string | null
          status: string | null
          total_amount: number | null
        }
        Insert: {
          booking_id?: string | null
          invoice_id: string
          issued_date?: string | null
          status?: string | null
          total_amount?: number | null
        }
        Update: {
          booking_id?: string | null
          invoice_id?: string
          issued_date?: string | null
          status?: string | null
          total_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "booking"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      medical_results: {
        Row: {
          exam_id: string
          result_date: string | null
          result_id: string
          result_value: string | null
          staff_id: string | null
          test_name: string | null
        }
        Insert: {
          exam_id: string
          result_date?: string | null
          result_id: string
          result_value?: string | null
          staff_id?: string | null
          test_name?: string | null
        }
        Update: {
          exam_id?: string
          result_date?: string | null
          result_id?: string
          result_value?: string | null
          staff_id?: string | null
          test_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_results_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "examination"
            referencedColumns: ["exam_id"]
          },
          {
            foreignKeyName: "medical_results_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notification: {
        Row: {
          content: string | null
          is_read: boolean | null
          notification_id: string
          progress_id: string
          sent_at: string | null
        }
        Insert: {
          content?: string | null
          is_read?: boolean | null
          notification_id: string
          progress_id: string
          sent_at?: string | null
        }
        Update: {
          content?: string | null
          is_read?: boolean | null
          notification_id?: string
          progress_id?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_progress_id_fkey"
            columns: ["progress_id"]
            isOneToOne: false
            referencedRelation: "treatment_progress"
            referencedColumns: ["progress_id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payment: {
        Row: {
          invoice_id: string | null
          method: string | null
          paid_amount: number | null
          paid_at: string | null
          payment_id: string
        }
        Insert: {
          invoice_id?: string | null
          method?: string | null
          paid_amount?: number | null
          paid_at?: string | null
          payment_id: string
        }
        Update: {
          invoice_id?: string | null
          method?: string | null
          paid_amount?: number | null
          paid_at?: string | null
          payment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: true
            referencedRelation: "invoice"
            referencedColumns: ["invoice_id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          appointment_id: string | null
          created_at: string | null
          currency: string
          id: string
          payment_method: string | null
          payment_status: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          transaction_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          created_at?: string | null
          currency?: string
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          transaction_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      prescription: {
        Row: {
          dosage: string | null
          medicine_name: string | null
          prescription_id: string
          result_id: string | null
          usage_instruction: string | null
        }
        Insert: {
          dosage?: string | null
          medicine_name?: string | null
          prescription_id: string
          result_id?: string | null
          usage_instruction?: string | null
        }
        Update: {
          dosage?: string | null
          medicine_name?: string | null
          prescription_id?: string
          result_id?: string | null
          usage_instruction?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescription_result_id_fkey"
            columns: ["result_id"]
            isOneToOne: true
            referencedRelation: "medical_results"
            referencedColumns: ["result_id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      role: {
        Row: {
          role_id: number
          role_name: string
        }
        Insert: {
          role_id?: never
          role_name: string
        }
        Update: {
          role_id?: never
          role_name?: string
        }
        Relationships: []
      }
      service_prices: {
        Row: {
          created_at: string | null
          currency: string
          description: string | null
          id: string
          is_active: boolean | null
          price: number
          service_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          price: number
          service_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          price?: number
          service_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      treatment_progress: {
        Row: {
          activity: string | null
          doctor_note: string | null
          progress_date: string | null
          progress_id: string
          schedule_id: string | null
          status: string | null
        }
        Insert: {
          activity?: string | null
          doctor_note?: string | null
          progress_date?: string | null
          progress_id: string
          schedule_id?: string | null
          status?: string | null
        }
        Update: {
          activity?: string | null
          doctor_note?: string | null
          progress_date?: string | null
          progress_id?: string
          schedule_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treatment_progress_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "treatment_schedules"
            referencedColumns: ["schedule_id"]
          },
        ]
      }
      treatment_record: {
        Row: {
          customer_id: string | null
          record_id: string
          result_id: string | null
        }
        Insert: {
          customer_id?: string | null
          record_id: string
          result_id?: string | null
        }
        Update: {
          customer_id?: string | null
          record_id?: string
          result_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treatment_record_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "treatment_record_result_id_fkey"
            columns: ["result_id"]
            isOneToOne: false
            referencedRelation: "medical_results"
            referencedColumns: ["result_id"]
          },
        ]
      }
      treatment_schedules: {
        Row: {
          end_date: string | null
          notes: string | null
          result_id: string | null
          schedule_id: string
          start_date: string | null
          status: string | null
        }
        Insert: {
          end_date?: string | null
          notes?: string | null
          result_id?: string | null
          schedule_id: string
          start_date?: string | null
          status?: string | null
        }
        Update: {
          end_date?: string | null
          notes?: string | null
          result_id?: string | null
          schedule_id?: string
          start_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treatment_schedules_result_id_fkey"
            columns: ["result_id"]
            isOneToOne: false
            referencedRelation: "medical_results"
            referencedColumns: ["result_id"]
          },
        ]
      }
      treatment_services: {
        Row: {
          description: string | null
          duration_days: number | null
          fee: number | null
          name: string | null
          service_id: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          description?: string | null
          duration_days?: number | null
          fee?: number | null
          name?: string | null
          service_id: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          description?: string | null
          duration_days?: number | null
          fee?: number | null
          name?: string | null
          service_id?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treatment_services_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
        ]
      }
      User: {
        Row: {
          address: string | null
          date_of_birth: string | null
          email: string | null
          full_name: string | null
          gender: string | null
          phone: string | null
          role_id: number | null
          user_id: string
        }
        Insert: {
          address?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          gender?: string | null
          phone?: string | null
          role_id?: number | null
          user_id: string
        }
        Update: {
          address?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          gender?: string | null
          phone?: string | null
          role_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "User_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["role_id"]
          },
        ]
      }
      workschedule: {
        Row: {
          doctor_id: string
          shift: string | null
          work_date: string | null
          work_id: string
        }
        Insert: {
          doctor_id: string
          shift?: string | null
          work_date?: string | null
          work_id: string
        }
        Update: {
          doctor_id?: string
          shift?: string | null
          work_date?: string | null
          work_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workschedule_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      user_role: "customer" | "manager" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["customer", "manager", "admin"],
    },
  },
} as const
