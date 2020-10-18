import React, { useState, Fragment } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import Confirm from './components/Confirm';
import Success from './components/Success';

// Step titles
const labels = [ 'Personal Information', 'Business Details', 'Confirmation' ];

const BusinessLoan = () => {
	const [ steps, setSteps ] = useState(0)
	const [ fields, setFields ] = useState({
		firstName: '',
        lastName: '',
        age: '',
		gender: '',
        phone: '',
        job: '',
        Checking_account: '',
        Credit_amount: '',
        Duration: '',
        Annual_income: '',
        People_employed: '',
        Skilled_personnel: '',
        Years_running: '',
        Customer_facing: '',
        Place_of_operation_owned: '',
		Cash_transactions: '',
		Supply_of_goods: '',
        Value_of_assets: '',
	}); 
	

	// Proceed to next step
	const handleNext = () => setSteps(steps + 1);
	// Go back to prev step
    const handleBack = () => setSteps(steps - 1);
    
	const handleChange = name => event => {
		// console.log(event.target.value);
		setFields({ ...fields, [name]: event.target.value });
	  };

	const handleSteps = step => {
		switch (step) {
			case 0:
				return (
					<FirstStep
						handleNext={handleNext}
                        values={fields}
                        handleChange={handleChange}
					/>
				)
			case 1:
				return (
					<SecondStep
						handleNext={handleNext}
                        handleBack={handleBack}
                        handleChange={handleChange}
						values={fields}
					/>
				)
			case 2:
				return <Confirm handleNext={handleNext} handleBack={handleBack} values={fields} />
			default:
				break
		}
	}

	// Handle components
	return (
		<Fragment>
			{steps === labels.length ? (
				<Success />
			) : (
				<Fragment>
					<Stepper activeStep={steps} style={{ paddingTop: 30, paddingBottom: 50 }} alternativeLabel>
						{labels.map(label => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{handleSteps(steps)}
				</Fragment>
			)}
		</Fragment>
	)
}

export default BusinessLoan;
