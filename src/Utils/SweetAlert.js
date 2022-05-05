import Swal from 'sweetalert2';

export function SweetAlert ({ title, html, icon }) {
  Swal.fire({
    title,
    html,
    icon
  });
}
