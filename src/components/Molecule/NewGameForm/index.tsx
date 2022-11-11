import "./NewGameForm.scss";
import Input from "../../../components/Atom/Input";
import Button from "../../../components/Atom/Button";
import { Formik } from "formik";

interface INewGameForm {
  onSubmit: Function;
}

const NewGameForm = (props: INewGameForm) => {
  return (
    <Formik
      initialValues={{
        nickname: "",
        numberOfRounds: 1,
      }}
      validate={(values) => {
        // @TODO: check why validation is not working
        // const errors: {
        //   nickname: string;
        //   numberOfRounds: string;
        // } = {
        //   nickname: "",
        //   numberOfRounds: "",
        // };
        // if (!values.nickname) {
        //   errors.nickname = "Must set nickname";
        // }
        // if (!values.numberOfRounds) {
        //   errors.numberOfRounds = "Must set number of rounds";
        // }
        // return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await props.onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => {
        const hasError = () => {
          return (
            (errors.nickname && touched.nickname && errors.nickname) ||
            (errors.numberOfRounds && touched.numberOfRounds && errors.numberOfRounds)
          );
        };

        return (
          <form onSubmit={handleSubmit} id="new-game-form" data-testid="new-game-form">
            <div className="new-game-form">
              <div className={`wrapper ${hasError() ? "has-error" : ""}`}>
                <div className="input-group">
                  <Input
                    data-testid="input-nickname"
                    placeholder="Nickname"
                    type="text"
                    name="nickname"
                    onChange={handleChange}
                  />
                  <label className="error">
                    {errors.nickname && touched.nickname && errors.nickname}
                  </label>
                </div>

                <div className="input-group">
                  <Input
                    data-testid="input-number-of-rounds"
                    placeholder="Number of rounds"
                    type="number"
                    name="numberOfRounds"
                    onChange={handleChange}
                  />
                  <label className="error">
                    {errors.numberOfRounds &&
                      touched.numberOfRounds &&
                      errors.numberOfRounds}
                  </label>
                </div>
              </div>
              <Button type="submit" data-testid="btn-start">
                Start game
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default NewGameForm;
