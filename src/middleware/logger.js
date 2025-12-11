const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, url, ip } = req;
  
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  
  if (method === 'POST' || method === 'PUT') {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  
  next();
};

module.exports = logger;