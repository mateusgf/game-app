import "./JoinGameForm.scss";
import Input from "../../../components/Atom/Input";
import Button from "../../../components/Atom/Button";
import { Formik, Field } from "formik";

interface IJoinGameForm {
  onSubmit: Function;
}

const JoinGameForm = (props: IJoinGameForm) => {
  return (
    <Formik
      initialValues={{
        nickname: "",
        gameId: "",
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
            (errors.gameId && touched.gameId && errors.gameId)
          );
        };

        return (
          <form onSubmit={handleSubmit} id="join-game-form" data-testid="join-game-form">
            <div className="join-game-form">
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
                    data-testid="input-game-id"
                    placeholder="Game ID"
                    type="text"
                    name="gameId"
                    onChange={handleChange}
                  />
                  <label className="error">
                    {errors.gameId && touched.gameId && errors.gameId}
                  </label>
                </div>
              </div>
              <Button data-testid="btn-join" type="submit">
                Join game
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default JoinGameForm;
