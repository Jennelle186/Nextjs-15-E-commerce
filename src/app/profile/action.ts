import { profileSchema } from './profileSchema';
import { createClient } from '../../../utils/supabase/client';

export async function updateProfile(profileData: {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  username?: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  avatar_url?: string;
  phoneNumber: string;
  updated_at?: string;
}) {
  try {
    const validation = profileSchema.safeParse(profileData);

    if (!validation.success) {
      return {
        error: true,
        message: validation.error.issues[0]?.message ?? 'Invalid data provided',
      };
    }

    const supabase = createClient();

    const { data: user, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return {
        error: true,
        message: authError?.message ?? 'User not authenticated',
      };
    }

    const { error } = await supabase.from('profiles').upsert({
      id: user.user.id,
      ...profileData,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }


    return {
      error: false,
      message: 'Profile updated successfully',
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message ?? 'An unexpected error occurred',
    };
  }
}