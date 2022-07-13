import { ErrorMessage, Field, Form, Formik } from 'formik'

class RealEstateRenovationValues {
    closingCost: string = ''
    investmentDuration: string = ''
    projectedSalePrice: string = ''
    purchasePrice: string = ''
    region: string = ''
    rennovationCost: string = ''
    subRegion: string = ''
}

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values: RealEstateRenovationValues) => {
    const errors: RealEstateRenovationValues = {
        region: '',
        subRegion: '',
        purchasePrice: '',
        rennovationCost: '',
        projectedSalePrice: '',
        investmentDuration: '',
        closingCost: '',
    }

    if (!values.purchasePrice) {
        errors.purchasePrice = 'Required'
    } else if (!/^[0-9]+$/i.test(values.purchasePrice)) {
        errors.purchasePrice = 'Invalid Purchase Price'
    }

    return errors
}

interface LabeledFieldProps {
    name: string
    title: string
    placeholder?: string
}

interface DisplayFieldProps {
    name: string
    title: string
    value: string
}

const LabeledField = (props: LabeledFieldProps) => {
    return (
        <div className="input-container">
            <label htmlFor={props.name}>{props.title}</label>
            <Field {...props}></Field>
            <ErrorMessage name={props.name} />
        </div>
    )
}

const DisplayField = (props: DisplayFieldProps) => {
    return (
        <div className="input-container">
            <label htmlFor={props.name}>{props.title}</label>
            {props.value}
            <ErrorMessage name={props.name} />
        </div>
    )
}

export const RealEstateRennovationForm = () => {
    return (
        <div>
            <Formik
                initialValues={{
                    purchasePrice: '',
                    rennovationCost: '',
                    closingCost: '',
                    projectedSalePrice: '',
                    investmentDuration: '',
                    region: '',
                    subRegion: '',
                }}
                validate={validate}
                onSubmit={values => {
                    alert(JSON.stringify(values, null, 2))
                }}
            >
                {props => {
                    const projectedSalePrice = parseInt(props.values.projectedSalePrice)
                    const purchasePrice = parseInt(props.values.purchasePrice)
                    const returnOnInvestment = (projectedSalePrice - purchasePrice) / purchasePrice
                    const displayReturnOnInvestment = returnOnInvestment.toLocaleString(undefined, {
                        style: 'percent',
                        minimumFractionDigits: 2,
                    })

                    const investmentDuration = parseInt(props.values.investmentDuration)
                    const annualizedReturn =
                        (1 + returnOnInvestment) ** (12 / investmentDuration) - 1
                    const displayAnnualizedReturn = annualizedReturn.toLocaleString(undefined, {
                        style: 'percent',
                        minimumFractionDigits: 2,
                    })
                    return (
                        <Form>
                            <h1>Summary</h1>
                            <LabeledField name="region" title="Region" placeholder="United States" />
                            <LabeledField
                                name="subRegion"
                                title="State / Province"
                                placeholder="Florida"
                            />
                            <LabeledField name="purchasePrice" title="Purchase Price" />
                            <LabeledField name="closingCost" title="Closing Cost" />
                            <LabeledField name="rennovationCost" title="Rennovation Cost" />
                            <LabeledField name="projectedSalePrice" title="Projected Sale Price" />
                            <LabeledField
                                name="investmentDuration"
                                title="Investment Duration (Months)"
                            />

                            <DisplayField
                                name="returnOnInvestment"
                                title="ROI"
                                value={displayReturnOnInvestment}
                            />
                            <DisplayField
                                name="annualizedReturn"
                                title="Annualized Return"
                                value={displayAnnualizedReturn}
                            />

                            <button type="submit">Submit</button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
