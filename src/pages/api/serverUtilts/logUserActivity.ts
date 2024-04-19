/**
 * Logs user activity by sending a request to the setLog endpoint.
 * If an error occurs during the fetch operation, it is caught and logged to the console, and a new Error is thrown.
 *
 * @function logUserActivity
 * @param {string} eventType - The type of event to log. This should be a string representation of the event.
 * @param {string} [accountId] - The ID of the logged in service-account. This parameter is optional.
 * @param {string} [details] - Additional details about the event. This parameter is optional.
 * @returns {Promise<void>} - This function returns a Promise that resolves to void. It does not return a value.
 * @throws {Error} - Throws an Error if an error occurs during the fetch operation.
 * @author Torjus A.M, Thomas H
 */
export async function logUserActivity(eventType: string, accountId?: string, details?: string) {
    console.log('logUserActivity:', eventType, accountId, details);

    await fetch('http://localhost:3000/api/auth/setLog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event_type: eventType,
            account_id: accountId,
            details: details
        }),
    }).catch(error => {
        console.error('Feil i loggføring:', error);
        throw new Error('Feil under loggføring, kontakt en administrator.');
    });
}