'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getAllCodes } from '@/services/codesService'
import { Code } from '@/types/code'

const Page = () => {
  const [codes, setCodes] = useState([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCodes = async () => {
      setLoading(true)
      try {
        const response = await getAllCodes()
        console.log(response)
        setCodes(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCodes()
  }, [])

  return (
    <div className='p-4 flex flex-col w-full gap-4'>
      <h1 className='text-2xl text-gray-700 font-semibold'>Redemption Codes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : codes.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className='flex'>
              <TableHead className='flex-1'>Id</TableHead>
              <TableHead className='flex-[2]'>Code</TableHead>
              <TableHead className='flex-1'>Discount</TableHead>
              <TableHead className='flex-1'>Status</TableHead>
              {/* <TableHead className='flex-1'>ExpiredAt</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {codes.map((product: Code) => (
              <TableRow className='flex' key={product.id}>
                <TableCell className='flex-1'>{product.id}</TableCell>
                <TableCell className='flex-[2]'>{product.code}</TableCell>
                <TableCell className='flex-1'>${product.discount}</TableCell>
                <TableCell className='flex-1'>{product.status}</TableCell>
                {/* <TableCell className='flex-1'>
                  {product.expiredAt?.toLocaleDateString()}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No codes available</p>
      )}
    </div>
  )
}

export default Page
