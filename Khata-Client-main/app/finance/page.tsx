import Dashboard from '../../components/finance/Dashboard';
import { FinanceProtectedRoute } from '../authContext/routesProtector';

export default function FinancePage() {
  return (
    <FinanceProtectedRoute>
      <Dashboard />
    </FinanceProtectedRoute>
  );
}
