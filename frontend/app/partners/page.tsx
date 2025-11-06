export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-blood-500 mb-8">
        Partner With Us
      </h1>
      <p className="text-gray-400 text-lg mb-6">
        Join our network of horror experience providers and reach thousands of 
        thrill-seekers worldwide.
      </p>
      <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-blood-500 mb-4">
          Benefits of Partnership
        </h2>
        <ul className="space-y-3 text-gray-400">
          <li>• Access to a global audience of horror enthusiasts</li>
          <li>• Automated booking and payment processing</li>
          <li>• Marketing support and promotion</li>
          <li>• Partner dashboard for managing listings</li>
          <li>• Competitive commission rates</li>
        </ul>
      </div>
    </div>
  )
}
