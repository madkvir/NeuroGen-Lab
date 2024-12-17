import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import FormField from './FormField';
import FormStatus from './FormStatus';
import SubmitButton from './SubmitButton';
import ServiceSelection from './ServiceSelection';
import PhoneInput from './PhoneInput';
import { countryCodes } from '../../data/countryCodes';

const ContactForm = () => {
  const [countryCode, setCountryCode] = useState('+49');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    firstName: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
    'bot-field': '',
    services: {
      aiChatBot: false,
      aiVoiceBot: false,
      customDevelopment: false,
      aiAvatar: false,
      aiAssistant: false,
      counseling: false
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleServiceChange = (service: string) => {
    setFormState(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service as keyof typeof prev.services]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formState['bot-field']) {
      return;
    }

    const selectedServices = Object.entries(formState.services)
      .filter(([_, selected]) => selected)
      .map(([service]) => service);

    if (selectedServices.length === 0) {
      setIsSubmitting(false);
      return;
    }

    // Push form data to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'form_submission',
      form_name: 'contact_form',
      form_data: {
        name: formState.firstName,
        company: formState.companyName,
        email: formState.email,
        phone: `${countryCode} ${formState.phone}`,
        has_message: Boolean(formState.message),
        selected_services: selectedServices,
        consent: formState.consent,
        submission_timestamp: new Date().toISOString(),
        page_url: window.location.href
      }
    });

    const formData = new FormData();
    formData.append('form-name', 'contact');
    formData.append('name', formState.firstName);
    formData.append('companyName', formState.companyName);
    formData.append('email', formState.email);
    formData.append('phone', `${countryCode} ${formState.phone}`);
    formData.append('message', formState.message);
    formData.append('consent', formState.consent.toString());
    formData.append('selectedServices', selectedServices.join(', '));

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        setFormState({
          firstName: '',
          companyName: '',
          email: '',
          phone: '',
          message: '',
          consent: false,
          'bot-field': '',
          services: {
            aiChatBot: false,
            aiVoiceBot: false,
            customDevelopment: false,
            aiAvatar: false,
            aiAssistant: false,
            counseling: false
          }
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="flex flex-col items-center gap-4 sm:gap-6 text-center p-4 sm:p-8 bg-emerald-500/10 rounded-xl animate-fade-in w-full max-w-md mx-auto">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold text-white">Message Sent Successfully!</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Thank you for contacting us. We'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 sm:space-y-6" 
      data-netlify="true" 
      name="contact"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />
      
      <FormStatus status="idle" error={null} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Your Name *"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          required
        />

        <FormField
          label="Company Name"
          name="companyName"
          value={formState.companyName}
          onChange={handleChange}
        />
      </div>

      <FormField
        label="Email Address *"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
        required
      />

      <PhoneInput
        value={formState.phone}
        onChange={handleChange}
        countryCode={countryCode}
        onCountryCodeChange={setCountryCode}
        countryCodes={countryCodes}
      />

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          I'm interested in: *
        </label>
        <ServiceSelection
          services={formState.services}
          onChange={handleServiceChange}
        />
      </div>

      <FormField
        label="Message"
        name="message"
        as="textarea"
        rows={3}
        value={formState.message}
        onChange={handleChange}
      />

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formState.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-700 rounded bg-gray-900/90"
          required
        />
        <label htmlFor="consent" className="text-xs sm:text-sm text-gray-400">
          I agree to the processing of my personal data according to the{' '}
          <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            Privacy Policy
          </Link>
        </label>
      </div>

      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};

export default ContactForm;