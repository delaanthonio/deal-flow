import { ChangeEventHandler } from 'react';
import { Field, Form, Formik, useFormik } from 'formik';

class RealEstateRenovationValues {
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    purchasePrice: string = "";
    rennovationCost: string = "";
    salePrice: string = "";
    investmentDuration: string = "";
    closingCost: string = "";
}


// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values: RealEstateRenovationValues) => {
    const errors: RealEstateRenovationValues = {
        firstName: "", lastName: "", email: "", purchasePrice: "", rennovationCost:
            "", salePrice: "", investmentDuration: "", closingCost: ""
    };
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }

    if (!values.email) {
        errors.email = 'Required';
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.purchasePrice) {
        errors.purchasePrice = "Required"
    } else if (!/^[0-9]+$/i.test(values.purchasePrice)) {
        errors.purchasePrice = 'Invalid Purchase Price';
    }

    return errors;
};

interface FormInputProps {
    name: string
    title: string
    placeholder?: string
    errors?: string | number | readonly string[]
}

const FormInput = (props: FormInputProps) => {
    return (
        <div className='input-container'>
            <label htmlFor={props.name}>{props.title}</label>
            <Field {...props} >

            </Field>
            {props.errors ? <div>{props.errors}</div> : null}
        </div>

    )
}

export const RealEstateRennovationForm = () => {
    // Pass the useFormik() hook initial form values, a validate function that will be called when
    // form values change or fields are blurred, and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            purchasePrice: "",
            rennovationCost: "",
            closingCost: "",
            salePrice: "",
            investmentDuration: "",
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    purchasePrice: "",
                    rennovationCost: "",
                    closingCost: "",
                    salePrice: "",
                    investmentDuration: "",
                }}
                validate={validate}
                onSubmit={values => {
                    alert(JSON.stringify(values, null, 2))
                }}
            >

                <form onSubmit={formik.handleSubmit}>

                    <h1>Summary</h1>
                    <FormInput name="email" title="Email" placeholder="email" />
                    <FormInput name="closingCost" title="Closing Cost" />
                    <FormInput name="purchasePrice" title="Purchase Price" errors={formik.errors.purchasePrice} />
                    <div className='input-container'>
                        <label htmlFor="salePrice">Sale Price</label>
                        <input
                            id="salePrice"
                            name="salePrice"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.salePrice}
                        />
                        {formik.errors.salePrice ? <div>{formik.errors.salePrice}</div> : null}
                    </div>
                    <div className='input-container'>

                    </div>

                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                    {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}


                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                    <label htmlFor="investmentDuration">InvestmentDuration</label>
                    <input
                        id="investmentDuration"
                        name="investmentDuration"
                        type="investmentDuration"
                        onChange={formik.handleChange}
                        value={formik.values.investmentDuration}
                    />
                    {formik.errors.investmentDuration ? <div>{formik.errors.investmentDuration}</div> : null}

                    <button type="submit">Submit</button>
                </form>

            </Formik>
        </div >
    );
};
