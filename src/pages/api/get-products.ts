
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

import type { NextApiRequest, NextApiResponse } from 'next'
import verifyToken from './verifyToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.headers["authorization"])
    if(verifyToken(req.headers["authorization"])) {
      const auth = new JWT({
        // env var values here are copied from service account credentials generated by google
        // see "Authentication" section in docs for more info
        email: "stock-control@stock-control-443902.iam.gserviceaccount.com",
        key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJEbVHCyf9fK0W\netdboF4LerEC/LDJwjYTj4LVZbgkN2nneBvhutyoo336KNCz910cua5HUbfMiGV3\nsQxXvwW8ZxzPR8yNLI1qkReUi2EmcT8pxsxIj+Lcw+Cks/qwu+oJMqz6wc3/4BVG\n9p0/eeA7bEHp3zEzybLqlrgLD4JdbbqbQOZxajrB7Ymdz3/YPnAnxdinA0fCuDFP\nuu9fyf82IwduEEk/bUC8Dq9GTS3Iw6syoj+Lp04sCjKGsapAi58+9svFkUsiYvSq\nF6BirKijXk7j1Hm4d0ExN/C+qHUpK/riQ3XOqSg/5/1/tRmJWAyKBT+/yGsuEKRp\nirdPMuSZAgMBAAECggEAA4HEnEsNRQ5PRyJYdO+b3E4YRF6FND7bKkwS1dp9+igh\nd6+AWv3jNEMsiUTirC5722pz2yh8qm67Lrmx86pwNOxE4OrWN9ft70y9cTJdVpCO\n/IR/X4k4HxSA67AVugHl1jtVFlPz6uSgMmC1EILPBQvn4JnRz57fuQts0jwqKhHd\n/grdUBXZuRV/BNt7Qyf4E6jJ/FBDEz3UOd/XGAHzstz2oNb6RpQ8AhxOK8RX6400\no3nzge4hEl+RyLwu/1oB5/tkAQzPnFe0z7OytUFSAiDpXlCfTa6vDKORnmZ6wt0C\nDq1z9nGq/+wfGRSjtYcVj67SM69vdwWWw8yHrRKH5QKBgQDyhaEXlbyc1m1d0p00\n4bMdoRR3GguHYPSe+x/pZR16BpVoW9FKTCwSIkmx8UqxlX1YBSYnxivViMfpmCBc\na7cx9m0/sAKg721M0PL5b6gmdcREo4+WbFdwhxdKLXYsL2N2CHShz4JyNbmIDygp\nfioNhWi4qP06vQCpsDGg3wqptQKBgQDUPlPtr8GXqeXZaJA6t6YLfXwIzhi1xsf6\nzt/DtZJCX9vxYG4RvTiyW9dE3y4SMzlh0VC8xL8HbJ02PcG0x2bz0d8jMY91HoTs\nY9dCgGMsn/POBYxcflQJNb3TWvbgYxBIc5EeFYSnSGeWQsaFScownFDxoF2GrTqf\n8ZMqqU+N1QKBgC9bEoqlbW/+mtpwLsxNqgkGFBXxmwCzWPDWPnP3j5rtQC1hiGuG\nljBwS42YfSpR82jFkJ7BnnuSut6NGvyQ9/Okl86Q0uKT/fa68kbsm5vu8QUqHvaT\nbzuE1XJhkCqukjBRFF0oROOCRBkiRIhdn16Gh11PeisHDuMTiY1NICrlAoGACFHd\nJl8SXqiZSvlvVe3nA2JK32l8zHtbUXiUiu5uKk3pqD+YcPeS5mL1QEzjWHFLmYsD\n+DJaLqdSTlMDadu7LGmYrp99uSCWI1ISmRfBS3mFrBjJlMKa9rV1mHhjXw5jEAP/\nt0cuqQQMk3ZQo97tnxQxlBcuM15NAwIMO8rhRHUCgYBKA5K8v7r5enlEzsKMssrI\nsn7EWP17mkomybO7rC1wsDs+4mF+4gMD6nt9GpqIMSrDiUzPbBG/oFjDmhaHQkks\niMBM/HnK0dJv/+t1YUvqqkPrtwRVqA415QcG7+I22KXbE2QJXKK4g4kZIufv0AJZ\nSpHXi8IJy6pmq+hr7eiCLw==\n-----END PRIVATE KEY-----\n",
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.file'
        ],
      }) 

      const doc = new GoogleSpreadsheet('1rxXyIXMSaHfBbyYb1l5MZCrT-Y66y0ZotIt0sk8bO00', auth);
      await doc.loadInfo()
     // await doc.loadInfo(); // loads document properties and worksheets
      //console.log(doc.title);

      const sheet = await doc.sheetsByIndex[0]
     // await sheet.addRows([
       // {produto: "Manutenção",quantidade: 1},
       // {produto: "Perfume 1",quantidade: 2}
      // ])


      //await sheet.loadCells("A2:A80")

      await sheet.loadCells()
      let arr = []
      for(let i = 2; i < 100; i++) {
        if(await sheet.getCellByA1("A" + i).value == null) break
        let produto = await sheet.getCellByA1("A" + i)
        let quantidade = await sheet.getCellByA1("B" + i)
        let updatedDate = await sheet.getCellByA1("C" + i)
//
        arr.push({ product: produto.value, quantity: quantidade.value, updatedDate: updatedDate.value})
      }

      res.status(200).json({ products: arr});
    } else {
       res.status(200).json({message: "not autenticated"})
    }

  }