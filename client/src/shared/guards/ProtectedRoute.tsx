import { Loader } from '@shared/components';
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts';

const ProtectedRoute = ({ roles, children }: any) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  const hasRole = () => {
    return roles.includes(user?.role) || (roles.length == 1 && roles[0] == "ALL")
  }

  useEffect(() => {

    if (!user) {
      navigate("/login", { replace: true })
    }
    if (!hasRole()) {
      navigate(-1)
    }
    setLoading(false)
  }, [children])

  return loading ? (
    <Loader/>
  ) : children;
}

export default ProtectedRoute
