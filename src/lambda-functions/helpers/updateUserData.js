import supabase from './supabase'

const updateUserData = async (user, data) => {
  try {
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(data)
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error

    return updatedUser
  } catch (err) {
    throw err
  }
}

export default updateUserData
