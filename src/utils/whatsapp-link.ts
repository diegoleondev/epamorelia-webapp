export default function whatsappLink(props: {
  phone?: string;
  message?: string;
}) {
  const { phone = "", message = "" } = props;
  return `https://wa.me/${phone}?text=${message}`;
}
