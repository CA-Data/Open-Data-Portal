// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function helloAPI(req, res) {
    const response = await fetch(req.body,{headers: {'User-Agent': 'NextGenAPI/0.0.1',}}).then(response=>response)
    res.status(200).json({ data: response })
  }
  