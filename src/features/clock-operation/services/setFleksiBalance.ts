import Employee from "../../../utils/employee";

/**
 * Sets the balance of fleksitid for an employee by sending a request to the api endpoint.
 *
 * @param {Employee} employee - The employee whose flexitime balance is being set.
 * @param {string} overtimeInterval - The overtime interval to be added to the employee's flexitime balance.
 * @returns {Promise<void>} - Returns a promise that resolves when the operation is complete.
 * @throws {Error} - Throws an Error if the response from the server is not ok.
 */
const setFleksiBalance = async (employee: Employee, overtimeInterval: string): Promise<void> => {
    try {
        const response = await fetch('/api/workIntervals/setFleksBalance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({employee, overtimeInterval}),
        });
        if (!response.ok) {
            throw new Error("Kunne ikke sette flekksisaldo: " + response.statusText);
        }
    } catch (error) {
        throw error;
    }
};

export default setFleksiBalance;