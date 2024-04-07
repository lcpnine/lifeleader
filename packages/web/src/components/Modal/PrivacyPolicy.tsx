import { DefaultModalProps } from '@/hooks/useModal'

interface Props extends DefaultModalProps {}

const PrivacyPolicyModal = ({ closeModal }: Props) => {
  return (
    <div className="bg-white p-4 rounded flex flex-col items-center">
      <h2 className="text-lg font-semibold">Privacy Policy</h2>
      <button
        className="absolute top-3 right-3 text-xl font-semibold"
        onClick={closeModal}
      >
        &times;
      </button>
      <div className="mt-4 text-sm">
        <p>
          Your privacy is critically important to us. At Life Leader, we have a
          few fundamental principles:
        </p>
        <ul className="list-disc pl-5">
          <li>
            We don't ask you for personal information unless we truly need it.
          </li>
          <li>
            We don't share your personal information except to comply with the
            law, develop our products, or protect our rights.
          </li>
          <li>
            We don't store personal information on our servers unless required
            for the ongoing operation of one of our services.
          </li>
        </ul>

        <h3 className="mt-4 mb-2 font-bold">Information We Collect</h3>
        <p>
          We only collect information about you if we have a reason to do so —
          for example, to provide our services, to communicate with you, or to
          make our services better.
        </p>

        <h3 className="mt-4 mb-2 font-bold">How We Use Information</h3>
        <p>We use the information we collect in various ways, including to:</p>
        <ul className="list-disc pl-5">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
        </ul>

        <h3 className="mt-4 mb-2 font-bold">Sharing Information</h3>
        <p>
          This section should describe under what circumstances you share
          personal information with third parties, law enforcement, etc.
        </p>

        <h3 className="mt-4 mb-2 font-bold">Security</h3>
        <p>
          The security of your personal information is important to us but
          remember that no method of transmission over the Internet or method of
          electronic storage is 100% secure. While we strive to use commercially
          acceptable means to protect your personal information, we cannot
          guarantee its absolute security.
        </p>

        <h3 className="mt-4 mb-2 font-bold">Your Rights</h3>
        <p>
          Describe what rights your users have over their data, how they can
          exercise them, etc.
        </p>

        <h3 className="mt-4 mb-2 font-bold">Privacy Policy Changes</h3>
        <p>
          Although most changes are likely to be minor, Life Leader may change
          its Privacy Policy from time to time, and in Life Leader's sole
          discretion. We encourage visitors to frequently check this page for
          any changes to its Privacy Policy.
        </p>

        <p>
          If you have questions about accessing or correcting your personal data
          please contact us at{' '}
          <span className="font-semibold">life.leader.me@gmail.com</span>.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicyModal
