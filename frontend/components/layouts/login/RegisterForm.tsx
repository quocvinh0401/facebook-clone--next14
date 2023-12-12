import Image from "next/image";
import { Formik, Form, Field } from "formik";
import {
  cn,
  days,
  isValidDate,
  isValidMail,
  isValidPhone,
  months,
  years,
} from "~/utils/utility";
import { Builder } from "builder-pattern";
import { User } from "~/interface/user.interface";
import { usePost } from "~/hooks/use-api";
import { object, string } from "yup";

const RegisterForm = ({ setOpenRegisterForm }: any) => {
  const postAuth = usePost("auth");

  const schema = object({
    first_name: string().required("First name is required"),
    surname: string().required("Surname is required"),
    login: string().required("Please enter your phone number or email"),
    password: string().required("Password is required"),
  });

  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white/60">
      <div className="container relative w-[27rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-3xl font-semibold">Sign Up</h1>
          <Image
            className="cursor-pointer"
            src={"/svgs/x-clear.svg"}
            width={28}
            height={28}
            alt="x"
            onClick={() => setOpenRegisterForm(false)}
          />
        </div>
        <hr />
        <Formik
          initialValues={{
            first_name: "",
            surname: "",
            login: "",
            password: "",
            date: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            gender: "m",
          }}
          validationSchema={schema}
          onSubmit={async (values) => {
            const {
              year,
              month,
              date,
              first_name,
              surname,
              password,
              gender,
              login,
            } = values;
            if (isValidDate(+date, +month, +year)) {
              const payload = Builder<User>()
                .first_name(first_name)
                .surname(surname)
                .password(password)
                .gender(gender)
                .dob(new Date(`${year}-${month}-${date}`))
                .build();

              if (isValidMail(login)) payload.email = login;
              else if (isValidPhone(login)) payload.phone = login;
              else {
                console.log("Please enter your email or phone number");
                return;
              }

              try {
                await postAuth("sign-up", payload);
                setOpenRegisterForm(false);
              } catch (error) {}
            } else console.log("invalid date");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col space-y-5 p-4">
                <div className="flex gap-4">
                  <div className="input flex-1">
                    <Field
                      name="first_name"
                      placeholder="First name"
                      className={cn(
                        "w-full",
                        touched.first_name &&
                          errors.first_name &&
                          "border-red-500",
                      )}
                    />
                    {touched.first_name && errors.first_name ? (
                      <div className="error">{errors.first_name}</div>
                    ) : null}
                  </div>
                  <div className="input flex-1">
                    <Field
                      name="surname"
                      placeholder="Surname"
                      className={cn(
                        "w-full",
                        touched.surname && errors.surname && "border-red-500",
                      )}
                    />
                    {touched.surname && errors.surname ? (
                      <div className="error">{errors.surname}</div>
                    ) : null}
                  </div>
                </div>
                <div className="input">
                  <Field
                    name="login"
                    type="text"
                    placeholder="Mobile number or email address"
                    className={cn(
                      "w-full",
                      touched.login && errors.login && "border-red-500",
                    )}
                  />
                  {touched.login && errors.login ? (
                    <div className="error">{errors.login}</div>
                  ) : null}
                </div>
                <div className="input">
                  <Field
                    name="password"
                    type="password"
                    placeholder="New password"
                    className={cn(
                      "w-full",
                      touched.password && errors.password && "border-red-500",
                    )}
                  />
                  {touched.password && errors.password ? (
                    <div className="error">{errors.password}</div>
                  ) : null}
                </div>

                <div>
                  <span className="text-xs text-primary-100">
                    Date of birth
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    <Field component="select" name="date">
                      {days().map((day, index) => (
                        <option value={day} key={index}>
                          {day}
                        </option>
                      ))}
                    </Field>
                    <Field component="select" name="month">
                      {months.map((month, index) => (
                        <option value={month} key={index}>
                          {month}
                        </option>
                      ))}
                    </Field>
                    <Field component="select" name="year">
                      {years().map((year, index) => (
                        <option value={year} key={index}>
                          {year}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-primary-100">Gender</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex justify-between rounded-lg border p-2 px-4">
                      <label htmlFor="m">Male</label>
                      <Field type="radio" name="gender" id="m" value="m" />
                    </div>
                    <div className="flex justify-between rounded-lg border p-2 px-4">
                      <label htmlFor="f">Female</label>
                      <Field type="radio" name="gender" id="f" value="f" />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mx-auto w-fit min-w-[12rem] rounded-lg bg-neutral p-2 text-lg font-bold text-white"
                >
                  Sign Up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default RegisterForm;
