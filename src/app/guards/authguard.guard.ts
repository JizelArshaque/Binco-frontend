import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import Swal from 'sweetalert2';

export const authguardGuard: CanActivateFn = (route, state) => {

  const authStatus = inject(AuthServiceService)
  const router = inject(Router)
  if(authStatus.islogged()){
    return true
  }
  else{
    Swal.fire('Please Login again!')
    router.navigateByUrl('/login')
    return false
    

  }
};
