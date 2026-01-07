export const validationRegister = (values: any) => {
  const errors: any = {};
  let passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!values.username) {
    errors.username = "El nombre de usuario es requerido";
  } else if (values.username.length < 3) {
    errors.username =
      "El nombre de usuario debe tener como mínimo 3 caracteres";
  } else if (values.username.length > 30) {
    errors.username =
      "El nombre de usuario no debe poseer más de 30 caracteres";
  }

  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "El email no es válido";
  } else if (values.email.length > 50) {
    errors.email = "El email no debe poseer más de 50 caracteres";
  } else if (values.email.length < 5) {
    errors.email = "El email debe tener como mínimo 5 caracteres";
  }

  if (!values.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "La contraseña no es válida. Debe contener una mayuscula, un número y un caracter especial";
  } else if (values.password.length < 8) {
    errors.password = "La contraseña debe tener como mínimo 8 caracteres";
  } else if (values.password.length > 30) {
    errors.password = "La contraseña no debe poseer más de 30 caracteres";
  }
  return errors;
};

export const validationLogin = (values: any) => {
  const errors: any = {};
  let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!values.email) {
    errors.email = "El email es requerido";
  }
  if (!emailRegex.test(values.email)) {
    errors.email = "El email no es válido";
  }

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  }
  return errors;
};

export const validationRecoverPassword = (values: any) => {
  const errors: any = {};
  let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!values.email) {
    errors.email = "El email es requerido";
  }
  if (!emailRegex.test(values.email)) {
    errors.email = "El email no es válido";
  }

  return errors;
};

export const validationUpdatePassword = (values: any) => {
  const errors: any = {};

  let passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );

  if (!values.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "La contraseña no es válida. Debe contener una mayuscula, un número y un caracter especial";
  } else if (values.password.length < 8) {
    errors.password = "La contraseña debe tener como mínimo 8 caracteres";
  } else if (values.password.length > 30) {
    errors.password = "La contraseña no debe poseer más de 30 caracteres";
  }

  return errors;
};
