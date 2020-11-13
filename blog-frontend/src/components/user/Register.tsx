import React, {useState} from 'react';
import {withRouter, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form";


function Register(): JSX.Element {
    let history = useHistory();
    const {register, handleSubmit, errors} = useForm();

    interface IValues {
        [key: string]: any;
    }

    const [values, setValues] = useState<IValues>([]);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isCredUnique, setIsCredUnique] = useState<boolean>(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);

    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement> | any): Promise<void> => {
        setLoading(true);
        const formData = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        const submitSuccess: boolean = await submitForm(formData);
        setSubmitSuccess(submitSuccess);
        setValues({...values, formData});
        setLoading(false);
        setTimeout(() => {
            if (submitSuccess) {
                history.push('/auth/signin');
            } else {
                window.location.reload();
            }
        }, 1000);
    }

    const submitForm = async (formData: {}) => {
        // let success: boolean = false;
        // await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/signup`, {
        //     method: "post",
        //     headers: new Headers({
        //         "Content-Type": "application/json",
        //         "Accept": "application/json",
        //     }),
        //     body: JSON.stringify(formData)
        // }).then(async (response) => {
        //     console.log(response);
        //     if (response.ok) {
        //         const json = await response.json();
        //         console.log(json);
        //         success = true;
        //     } else {
        //         success = false;
        //     }
        // }).catch((error) => {
        //     console.log(error);
        //     success = false
        // });
        // return success;
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/signup`, {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }),
                body: JSON.stringify(formData)
            });
            // console.log(formData);
            console.log(response);
            if (response.status === 400) {
                setIsEmailInvalid(true);
                console.log('Is email invalid: ', isEmailInvalid);
                return false;
            }

            if (response.status === 409) {
                setIsCredUnique(true);
                console.log('Is credential unique: ', isCredUnique);
                return false;
            }
            return response.ok;
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }
    const setFormValues = (formValues: IValues) => {
        setValues({...values, ...formValues})
    }
    const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        setFormValues({[e.currentTarget.name]: e.currentTarget.value})
    }

    return (
        <div className="profile-area fixed-top-margin">
            <div className={"col-md-12 form-wrapper"}>
                {submitSuccess && (
                    <div className="alert alert-info mt-5" role="alert">
                        The form was successfully submitted!
                    </div>
                )}
                {isCredUnique && (
                    <div className="alert alert-danger" role="alert">
                        Username/Email is already taken. Please try again...
                    </div>
                )}
                {isEmailInvalid && (
                    <div className="alert alert-danger" role="alert">
                        Invalid email. Please try again...
                    </div>
                )}
                <form id={"create-user-form"} onSubmit={handleSubmit(handleFormSubmission)} noValidate={true}>
                    <h4 className={"mt-5 mb-3 center-header"}>Create an Account</h4>
                    <div className="form-group col-md-12">
                        <label htmlFor="username"> Username </label>
                        <input type="text"
                               id="username"
                               ref={register({required: true})}
                               onChange={(e) => handleInputChanges(e)}
                               name="username" className="form-control"
                               placeholder="Enter username"/>
                        {errors.username && errors.username.type === "required" && (
                            <div className="error">Please enter a username.</div>
                        )}
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="email"> Email </label>
                        <input type="text"
                               id="email"
                               ref={register({required: true})}
                               onChange={(e) => handleInputChanges(e)}
                               name="email"
                               className="form-control"
                               placeholder="Enter email"/>
                        {errors.email && errors.email.type === "required" && (
                            <div className="error">Please enter a valid email.</div>
                        )}
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="email"> Password </label>
                        <input type="password"
                               id="password"
                               ref={register({required: true})}
                               onChange={(e) => handleInputChanges(e)}
                               name="password"
                               className="form-control"
                               placeholder="Enter password"/>
                        {errors.password && errors.password.type === "required" && (
                            <div className="error">Please enter a password.</div>
                        )}
                    </div>
                    <div className="form-group col-md-4 pull-right">
                        <button className="btn btn-success" type="submit">
                            Sign up
                        </button>
                        {loading &&
                        <span className="fa fa-circle-o-notch fa-spin"/>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Register)