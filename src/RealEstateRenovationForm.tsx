import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  closingCost: Yup.number().min(2).required('Required'),
  investorProfitShare: Yup.number()
    .min(50, 'Must by at least 50%')
    .max(100, 'Cannot be over 100%')
    .required('Required'),
  investmentDuration: Yup.number()
    .min(1, 'Must be at least 1 month')
    .max(60, 'Must be at most 60 months')
    .required('Required'),
  projectedSalePrice: Yup.number().min(0, 'Must be at least 0').required('Required'),
  purchasePrice: Yup.number().min(0, 'Must be at least 0').required('Required'),
  region: Yup.string().required('Required'),
  rennovationCost: Yup.number().min(0, 'Must be at least 0').required('Required'),
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
    <div className="input-field">
      <label className="field-title" htmlFor={props.name}>
        {props.title}
      </label>
      <Field className="deal-input-box" {...props}></Field>
      <ErrorMessage name={props.name} />
    </div>
  )
}

const DisplayField = (props: DisplayFieldProps) => {
  return (
    <div className="input-field">
      <label className="field-title">{props.title}</label>
      <span className="display-value"> {props.value}</span>
      <ErrorMessage name={props.name} />
    </div>
  )
}

export const RealEstateRennovationForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          closingCost: '0',
          investmentDuration: '0',
          investorProfitShare: '50',
          projectedSalePrice: '0',
          purchasePrice: '0',
          region: '',
          renovationCost: '0',
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
          const rennovationCost = parseInt(props.values.renovationCost)
          const amountRequested = purchasePrice + rennovationCost
          const displayAmountRequested = `$${amountRequested}`
          const investorProfitShare = parseInt(props.values.investorProfitShare)
          const projectedProfit = projectedSalePrice - amountRequested - closingCost
          const returnOnInvestment =
            ((projectedProfit / amountRequested) * investorProfitShare) / 100

          const displayReturnOnInvestment = returnOnInvestment.toLocaleString(undefined, {
            style: 'percent',
            minimumFractionDigits: 0,
          })
          const profitToInvestor = (projectedProfit * investorProfitShare) / 100
          const displayProfitToInvestor = `$${profitToInvestor}`

          const investmentDuration = parseInt(props.values.investmentDuration)
          const annualizedReturn =
            (1 + returnOnInvestment) ** (12 / investmentDuration) - 1
          const displayAnnualizedReturn = annualizedReturn.toLocaleString(undefined, {
            style: 'percent',
            minimumFractionDigits: 0,
          })
          return (
            <Form className="deal-form">
              <h1>Real Estate Renovation Deal</h1>

              <h3 className="section-header">Deal Structure</h3>
              <div className="deal-form-section">
                <LabeledField
                  name="title"
                  title="Title"
                  placeholder="My Real Estate Deal"
                />
                <LabeledField name="purchasePrice" title="Purchase Price" />
                <LabeledField name="closingCost" title="Closing Cost" />
                <LabeledField name="renovationCost" title="Renovation Cost" />

                <LabeledField name="projectedSalePrice" title="Projected Sale Price" />
                <LabeledField
                  name="investmentDuration"
                  title="Investment Duration (Months)"
                />
                <LabeledField name="investorProfitShare" title="Investor Profit Share" />
              </div>

              <h3 className="section-header">Deal Summary</h3>
              <div className="deal-form-section">
                <DisplayField
                  name="amountRequested"
                  title="Amount Requested"
                  value={displayAmountRequested}
                />
                <DisplayField
                  name="profitToInvestor"
                  title="Profit"
                  value={displayProfitToInvestor}
                />
                <DisplayField
                  name="returnOnInvestment"
                  title="Return"
                  value={returnOnInvestment ? displayReturnOnInvestment : '0%'}
                />
                <DisplayField
                  name="annualizedReturn"
                  title="Annualized Return"
                  value={annualizedReturn ? displayAnnualizedReturn : '0%'}
                />
              </div>

              <h3 className="section-header">Additional Information</h3>
              <div className="deal-form-section">
                <LabeledField name="region" title="Country" placeholder="United States" />
                <LabeledField
                  name="subRegion"
                  title="State / Province"
                  placeholder="Florida"
                />
              </div>

              <button type="submit" disabled={props.isSubmitting}>
                Submit
              </button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
