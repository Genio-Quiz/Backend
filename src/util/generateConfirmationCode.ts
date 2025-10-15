function generateConfirmationCode(): string {
  const code = Math.floor(Math.random() * 10000000).toString();
  return code.padStart(6, '0');
}

export default generateConfirmationCode;
