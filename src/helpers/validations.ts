export const validationRegister = (values: any) => {
  const errors: any = {};
  const passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  );
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!values.username) {
    errors.username = 'El nombre de usuario es requerido';
  } else if (values.username.length < 3) {
    errors.username =
      'El nombre de usuario debe tener como mínimo 3 caracteres';
  } else if (values.username.length > 30) {
    errors.username =
      'El nombre de usuario no debe poseer más de 30 caracteres';
  }

  if (!values.email) {
    errors.email = 'El email es requerido';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'El email no es válido';
  } else if (values.email.length > 50) {
    errors.email = 'El email no debe poseer más de 50 caracteres';
  } else if (values.email.length < 5) {
    errors.email = 'El email debe tener como mínimo 5 caracteres';
  }

  if (!values.password) {
    errors.password = 'La contraseña es obligatoria.';
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      'La contraseña no es válida. Debe contener una mayuscula, un número y un caracter especial';
  } else if (values.password.length < 8) {
    errors.password = 'La contraseña debe tener como mínimo 8 caracteres';
  } else if (values.password.length > 30) {
    errors.password = 'La contraseña no debe poseer más de 30 caracteres';
  }
  return errors;
};

export const validationLogin = (values: any) => {
  const errors: any = {};
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!values.email) {
    errors.email = 'El email es requerido';
  }
  if (!emailRegex.test(values.email)) {
    errors.email = 'El email no es válido';
  }

  if (!values.password) {
    errors.password = 'La contraseña es requerida';
  }
  return errors;
};

export const validationRecoverPassword = (values: any) => {
  const errors: any = {};
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!values.email) {
    errors.email = 'El email es requerido';
  }
  if (!emailRegex.test(values.email)) {
    errors.email = 'El email no es válido';
  }

  return errors;
};

export const validationUpdatePassword = (values: any) => {
  const errors: any = {};

  const passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  );

  if (!values.password) {
    errors.password = 'La contraseña es obligatoria.';
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      'La contraseña no es válida. Debe contener una mayuscula, un número y un caracter especial';
  } else if (values.password.length < 8) {
    errors.password = 'La contraseña debe tener como mínimo 8 caracteres';
  } else if (values.password.length > 30) {
    errors.password = 'La contraseña no debe poseer más de 30 caracteres';
  }

  return errors;
};

export const validationSearch = (values: any) => {
  const errors: any = {};

  if (values.search.length > 30) {
    errors.search = 'No debes superar los 30 caracteres';
  }

  return errors;
};

export const validationCompleteUserData = (values: any) => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'El nombre es requerido';
  } else if (values.name.length < 3) {
    errors.name = 'El nombre debe tener como mínimo 3 caracteres';
  } else if (values.name.length > 30) {
    errors.name = 'El nombre no debe poseer más de 30 caracteres';
  }

  if (!values.lastname) {
    errors.lastname = 'El apellido es requerido';
  } else if (values.lastname.length < 3) {
    errors.lastname = 'El apellido debe tener como mínimo 3 caracteres';
  } else if (values.lastname.length > 30) {
    errors.lastname = 'El apellido no debe poseer más de 30 caracteres';
  }

  if (!values.date) {
    errors.date = 'La fecha de nacimiento es requerida';
  } else {
    const selectedDate = new Date(values.date);
    const today = new Date();

    if (selectedDate > today) {
      errors.date = 'La fecha no puede ser del futuro';
    } else {
      let age = today.getFullYear() - selectedDate.getFullYear();
      const mothDiff = today.getMonth() - selectedDate.getMonth();

      if (
        mothDiff < 0 ||
        (mothDiff === 0 && today.getDate() < selectedDate.getDate())
      ) {
        age--;
      }

      if (age < 16) {
        errors.date = 'Debes ser mayor de 16 años';
      }
    }
  }

  if (!values.role) {
    errors.role = 'Debes elegir un rol';
  }

  return errors;
};

export const chatValidation = (values: any) => {
  const errors: any = {};

  if (values.content < 1) {
    errors.content = 'El mensaje no puede estar en blanco';
  }

  return errors;
};

export const reportValidation = (values: any) => {
  const errors: any = {};

  if (values.content < 1) {
    errors.content = 'El mensaje no puede estar en blanco';
  }

  if (!values.receiverId) {
    errors.receiverUser = 'Debes elegir un destinatario';
  }

  return errors;
};

export const userUpdateValidation = (values: any) => {
  const errors: any = {};

  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  if (!values.email) {
    errors.email = 'El email es requerido';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'El email no es válido';
  } else if (values.email.length > 50) {
    errors.email = 'El email no debe poseer más de 50 caracteres';
  } else if (values.email.length < 5) {
    errors.email = 'El email debe tener como mínimo 5 caracteres';
  }

  if (!values.name) {
    errors.name = 'El nombre es requerido';
  } else if (values.name.length < 3) {
    errors.name = 'El nombre debe tener como mínimo 3 caracteres';
  } else if (values.name.length > 30) {
    errors.name = 'El nombre no debe poseer más de 30 caracteres';
  }

  if (!values.lastname) {
    errors.lastname = 'El apellido es requerido';
  } else if (values.lastname.length < 3) {
    errors.lastname = 'El apellido debe tener como mínimo 3 caracteres';
  } else if (values.lastname.length > 30) {
    errors.lastname = 'El apellido no debe poseer más de 30 caracteres';
  }

  if (!values.date) {
    errors.date = 'La fecha de nacimiento es requerida';
  } else {
    const selectedDate = new Date(values.date);
    const today = new Date();

    if (selectedDate > today) {
      errors.date = 'La fecha no puede ser del futuro';
    } else {
      let age = today.getFullYear() - selectedDate.getFullYear();
      const mothDiff = today.getMonth() - selectedDate.getMonth();

      if (
        mothDiff < 0 ||
        (mothDiff === 0 && today.getDate() < selectedDate.getDate())
      ) {
        age--;
      }

      if (age < 16) {
        errors.date = 'Debes ser mayor de 16 años';
      }
    }
  }

  if (!values.role) {
    errors.role = 'Debes elegir un rol';
  }

  return errors;
};
