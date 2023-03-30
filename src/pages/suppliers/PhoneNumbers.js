export default function PhoneList({ phoneNumbers }) {
    if (!Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
        return <p>No phone numbers found.</p>;
    } else if (phoneNumbers.length === 1) {
        return <p>{phoneNumbers[0]}</p>;
    } else {
        return (
            <ul>
                {phoneNumbers.map((number, index) => (
                    <li key={index}>{number}</li>
                ))}
            </ul>
        );
    }
}