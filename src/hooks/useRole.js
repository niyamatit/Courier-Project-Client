
import { getRole } from '../api/auth'
import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query'
import useUsersData from './useUsersData/useUsersData'
const useRole = () => {

  const[verifiedUser] = useUsersData()

  const {  loading } = useAuth()
  const { data: role, isLoading } = useQuery({
    enabled: !loading && !!verifiedUser?.email,
    queryFn: async () => await getRole(verifiedUser?.email),
    queryKey: ['role'],
  })

   return [role, isLoading]
}

export default useRole