import React from "react";
import { useForm } from "react-hook-form";
import cn from "classnames";
import auth from "../app/auth";
import { Button } from "../components/base";

export default function LoginPage(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    auth.login(() => {
      sessionStorage.setItem(
        "auth",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEyMzQ1Njc4OTAiLCJBZCI6Ik11c3RhZmEiLCJTb3lhZCI6IsOWenTDvHJrIiwiaWF0IjoxNTE2MjM5MDIyfQ.K7WhFDXGB0VGKCYbqnHC599wtQ5DvzLSKj5xQl1elZU"
      );
      props.history.push("/");
    });
  };

  return (
    <div
      className="d-flex flex-column flex-root border "
      style={{ minHeight: "100vh" }}
    >
      <div
        className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
        id="kt_login"
      >
        <div
          className="login-aside d-flex flex-column flex-row-auto"
          style={{ backgroundColor: "#F2C98A", width: 550 }}
          id="login-left-area"
        >
          <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
            <span className="text-center mb-10">
              <img
                src="https://litesoft.com.tr/assets/img/litesoft-logo.png"
                className="max-h-70px"
              />
            </span>

            <h3
              className="font-weight-bolder text-center font-size-h4 font-size-h1-lg"
              style={{ color: "#986923" }}
            >
              Gökkuşaği <b>CRM</b>
            </h3>
          </div>

          <div
            className="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
            id="login-img-area"
          ></div>
        </div>

        <div className="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
          <div className="d-flex flex-column-fluid flex-center">
            <div className="login-form login-signin">
              <form
                noValidate
                className="form"
                style={{ minWidth: "350px" }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="pb-13 pt-lg-0 pt-5">
                  <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                    Gökkuşağı CRM
                  </h3>
                  <span className="text-muted font-weight-bold font-size-h4">
                    Giriş Yapın
                  </span>
                </div>

                <div className="form-group">
                  <label className="font-size-h6 font-weight-bolder text-dark">
                    E-Posta
                  </label>
                  <input
                    className={cn([
                      "form-control form-control-solid h-auto py-7 px-6 rounded-lg mb-1",
                      errors.email && "border-danger",
                    ])}
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    aria-invalid={errors.email ? "true" : "false"}
                    placeholder="E-Posta"
                    {...register("email", {
                      required: "Zorunlu Alan",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Girilen değer e-posta biçimiyle eşleşmiyor",
                      },
                    })}
                  />
                  {errors.email && (
                    <span role="alert" className="text-danger">
                      <i className="fas fa-info-circle text-danger" />{" "}
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <div className="d-flex justify-content-between mt-n5">
                    <label className="font-size-h6 font-weight-bolder text-dark pt-5">
                      Şifre
                    </label>
                  </div>
                  <input
                    className={cn([
                      "form-control form-control-solid h-auto py-7 px-6 rounded-lg mb-1",
                      errors.password && "border-danger",
                    ])}
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Şifre"
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password", {
                      required: "Zorunlu Alan",
                      minLength: {
                        value: 5,
                        message: "Minimum 5 karakter",
                      },
                    })}
                  />

                  {errors.password && (
                    <span role="alert" className="text-danger">
                      <i className="fas fa-info-circle text-danger" />{" "}
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="pb-lg-0 pb-5">
                  <Button
                    text="Giriş Yap"
                    buttonType="submit"
                    className="font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
