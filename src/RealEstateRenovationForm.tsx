import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

class RealEstateRenovationValues {
    closingCost: string = ''
    investorProfitShare: string = ''
    investmentDuration: string = ''
    projectedSalePrice: string = ''
    purchasePrice: string = ''
    region: string = ''
    rennovationCost: string = ''
    subRegion: string = ''
}

const validationSchema = Yup.object().shape({
    closingCost: Yup.number().min(2).required('Required'),
    investorProfitShare: Yup.number().min(50, "Must by at least 50%").max(100, "Cannot be over 100%").required('Required'),
    investmentDuration: Yup.number().min(1, "Must be at least 1 month").max(60, "Must be at most 60 months").required('Required'),
    projectedSalePrice: Yup.number().min(0, "Must be at least 0").required('Required'),
    purchasePrice: Yup.number().min(0, "Must be at least 0").required('Required'),
    region: Yup.string().required('Required'),
    rennovationCost: Yup.number().min(0, "Must be at least 0").required('Required'),
    subRegion: Yup.string().required('Required'),
})

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
                    closingCost: '',
                    investmentDuration: '',
                    investorProfitShare: '50',
                    projectedSalePrice: '',
                    purchasePrice: '',
                    region: '',
                    rennovationCost: '',
                    subRegion: '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    alert(JSON.stringify(values, null, 2))
                }}
            >
                {props => {
                    const projectedSalePrice = parseInt(props.values.projectedSalePrice)
                    const purchasePrice = parseInt(props.values.purchasePrice)
                    const closingCost = parseInt(props.values.closingCost)
                    const rennovationCost = parseInt(props.values.rennovationCost)
                    const amountRequested = purchasePrice + closingCost + rennovationCost
                    const displayAmountRequested = `$${amountRequested}`
                    const investorProfitShare = parseInt(props.values.investorProfitShare)

                    const projectedProfit = projectedSalePrice - amountRequested
                    const returnOnInvestment = projectedProfit / amountRequested * investorProfitShare / 100

                    const displayReturnOnInvestment = returnOnInvestment.toLocaleString(undefined, {
                        style: 'percent',
                        minimumFractionDigits: 2,
                    })
                    const profitToInvestor = projectedProfit * investorProfitShare / 100;
                    const displayProfitToInvestor = `$${profitToInvestor}`;

                    const investmentDuration = parseInt(props.values.investmentDuration)
                    const annualizedReturn =
                        (1 + returnOnInvestment) ** (12 / investmentDuration) - 1
                    const displayAnnualizedReturn = annualizedReturn.toLocaleString(undefined, {
                        style: 'percent',
                        minimumFractionDigits: 2,
                    })
                    return (
                        <Form>
                            <h1>Real Estate Renovation Deal</h1>

                            <h3>Deal Structure</h3>
                            <LabeledField name="title" title="Title" placeholder="My Real Estate Deal" />
                            <LabeledField name="purchasePrice" title="Purchase Price" />
                            <LabeledField name="closingCost" title="Closing Cost" />
                            <LabeledField name="rennovationCost" title="Rennovation Cost" />
                            <DisplayField
                                name="amountRequested"
                                title="Amount Requested"
                                value={amountRequested ? displayAmountRequested : "TBD"}
                            />

                            <LabeledField name="projectedSalePrice" title="Projected Sale Price" />
                            <LabeledField
                                name="investmentDuration"
                                title="Investment Duration (Months)"
                            />
                            <LabeledField name="investorProfitShare" title="Investor Profit Share" />

                            <h3>Investor Benefits</h3>
                            <DisplayField
                                name="profitToInvestor"
                                title="Profit"
                                value={profitToInvestor ? displayProfitToInvestor : "$0"}
                            />
                            <DisplayField
                                name="returnOnInvestment"
                                title="Return"
                                value={returnOnInvestment ? displayReturnOnInvestment : "0%"}
                            />
                            <DisplayField
                                name="annualizedReturn"
                                title="Return (Annualized)"
                                value={annualizedReturn ? displayAnnualizedReturn : "0%"}
                            />

                            <h3>Additional Information</h3>
                            <LabeledField name="region" title="Region" placeholder="United States" />
                            <LabeledField
                                name="subRegion"
                                title="State / Province"
                                placeholder="Florida"
                            />

                            <button type="submit">Submit</button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
