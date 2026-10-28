const messages = {
  name: {
    valueMissing: 'Escribe tu nombre y apellidos.'
  },
  email: {
    valueMissing: 'Escribe tu correo electrónico.',
    typeMismatch: 'El correo debe tener un formato como nombre@dominio.com.'
  },
  phone: {
    valueMissing: 'Escribe un teléfono de contacto.',
    patternMismatch: 'El teléfono debe tener al menos 9 cifras.'
  },
  date: {
    valueMissing: 'Elige el día de la reserva.',
    rangeUnderflow: 'El día no puede ser anterior a hoy.',
    customError: 'Los lunes el restaurante está cerrado. Elige otro día.'
  },
  time: {
    valueMissing: 'Elige una hora.'
  },
  guests: {
    valueMissing: 'Indica cuántas personas seréis.'
  }
};

function getMessage(field) {
  const fieldMessages = messages[field.id] || {};

  for (const problem in fieldMessages) {
    if (field.validity[problem]) {
      return fieldMessages[problem];
    }
  }

  return '';
}

// "yyyy-mm-dd" of today in local time, for the min attribute of the date input
function today() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function initBookingForm() {
  const form = document.querySelector('#booking-form');

  if (!form) {
    return;
  }

  const fields = form.querySelectorAll('input[required], select[required]');
  const summary = form.querySelector('#form-errors');
  const summaryList = summary.querySelector('ul');
  const dateField = form.querySelector('#date');
  let submitted = false;

  // We show our own messages instead of the browser bubbles
  form.noValidate = true;
  dateField.min = today();

  // Every field gets an empty error message linked with aria-describedby
  fields.forEach((field) => {
    const error = document.createElement('p');
    error.className = 'field__error';
    error.id = `${field.id}-error`;
    error.hidden = true;
    field.insertAdjacentElement('afterend', error);
    field.setAttribute('aria-describedby', error.id);
  });

  function checkMonday() {
    // new Date('yyyy-mm-dd') is UTC, so we read the day with getUTCDay
    const isMonday = dateField.value && new Date(dateField.value).getUTCDay() === 1;
    dateField.setCustomValidity(isMonday ? 'monday' : '');
  }

  function validateField(field) {
    if (field === dateField) {
      checkMonday();
    }

    const error = document.getElementById(`${field.id}-error`);
    const message = field.checkValidity() ? '' : getMessage(field);

    error.textContent = message;
    error.hidden = !message;
    field.setAttribute('aria-invalid', Boolean(message));

    return !message;
  }

  function showSummary(invalidFields) {
    summaryList.innerHTML = '';

    invalidFields.forEach((field) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${field.id}`;
      link.textContent = getMessage(field);
      item.append(link);
      summaryList.append(item);
    });

    summary.hidden = invalidFields.length === 0;
  }

  const confirmation = document.querySelector('#booking-confirmation');

  function showConfirmation() {
    // The date comes as "yyyy-mm-dd" (UTC), so we format it in UTC too
    const date = new Date(dateField.value).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC'
    });
    const name = form.querySelector('#name').value.trim();
    const time = form.querySelector('#time').value;
    const guests = form.querySelector('#guests').value;
    const people = guests === '1' ? '1 persona' : `${guests} personas`;

    confirmation.querySelector('.booking-confirmation__text').textContent =
      `Gracias, ${name}. Te esperamos el ${date} a las ${time} (${people}).`;

    form.hidden = true;
    confirmation.hidden = false;
    confirmation.focus();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitted = true;
    const invalidFields = [...fields].filter((field) => !validateField(field));

    if (invalidFields.length > 0) {
      showSummary(invalidFields);
      summary.focus();
      return;
    }

    summary.hidden = true;
    showConfirmation();
  });

  confirmation.querySelector('#booking-again').addEventListener('click', () => {
    form.reset();
    submitted = false;
    fields.forEach((field) => field.removeAttribute('aria-invalid'));
    form.querySelectorAll('.field__error').forEach((error) => {
      error.hidden = true;
    });
    confirmation.hidden = true;
    form.hidden = false;
    form.querySelector('#name').focus();
  });

  // After the first try, errors update while the user corrects them
  fields.forEach((field) => {
    field.addEventListener('change', () => {
      if (submitted) {
        validateField(field);
      }
    });
    field.addEventListener('blur', () => {
      if (submitted) {
        validateField(field);
      }
    });
  });
}
