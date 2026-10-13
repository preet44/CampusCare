function Message({ message, type = "danger" }) {
  if (!message) return null;

  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
}

export default Message;

/*Purpose: A reusable React component for displaying success, error, warning, or other messages using Bootstrap alerts.

message → text that needs to be displayed.
type = "danger" → default Bootstrap alert type is danger (usually for errors).
if (!message) return null → if there is no message, nothing is displayed.
alert alert-${type} → dynamically creates Bootstrap classes like:
alert-danger
alert-success
alert-warning
role="alert" → tells browsers/screen readers that this is an alert message.
{message} → displays the actual message.
export default Message → makes the component reusable in other files.*/