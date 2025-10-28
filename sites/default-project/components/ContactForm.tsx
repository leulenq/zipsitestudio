use client;
import { useState } from 'react';
import { FormControl, FormLabel, FormErrorMessage, Input, Button } from '@chakra-ui/react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    try {
      setIsSubmitting(true);
      // Add your contact form submission logic here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setErrorMessage('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormControl>
      <FormLabel>Name:</FormLabel>
      <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <FormLabel>Email:</FormLabel>
      <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <FormLabel>Message:</FormLabel>
      <Input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button type='submit' isLoading={isSubmitting} onClick={handleSubmit}>Submit</Button>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default ContactForm;