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
import { Button } from '@/components/ui/button'
import { IoMdAdd } from 'react-icons/io'
import Link from 'next/link'
import { getAllOrders } from '@/services/orderServices'
import { Order, OrderProduct, OrderStatus } from '@/types/order'

const Page = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState<boolean>(true)

  const handleStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PROCESSING:
        return 'text-yellow-500'
      case OrderStatus.COMPLETED:
        return 'text-green-500'
      case OrderStatus.FAILED:
        return 'text-red-500'
      default:
        return ''
    }
  }

  useEffect(() => {
    const fetchCodes = async () => {
      setLoading(true)
      try {
        const response = await getAllOrders()
        setOrders(response.data)
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
      <div className='flex justify-between items-start'>
        <h1 className='text-2xl text-gray-700 font-semibold'>Orders</h1>
        <Link href='/orders/create'>
          <Button variant='default'>
            <IoMdAdd />
            Create Order
          </Button>
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className='flex'>
              <TableHead className='flex-1'>Id</TableHead>
              <TableHead className='flex-1'>Cutomer</TableHead>
              <TableHead className='flex-[2]'>Products</TableHead>
              <TableHead className='flex-1'>Total Price</TableHead>
              <TableHead className='flex-1'>Code</TableHead>
              <TableHead className='flex-1'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow className='flex' key={order.id}>
                <TableCell className='flex-1'>{order.id}</TableCell>
                <TableCell className='flex-1'>{order.fullname}</TableCell>
                <TableCell className='flex-[2]'>
                  {order.products.map((product: OrderProduct, i) => (
                    <p key={i}>
                      {product.quantity}x {product.name}
                    </p>
                  ))}
                </TableCell>
                <TableCell className='flex-1'>${order.totalPrice}</TableCell>
                <TableCell className='flex-1'>
                  {order.redemptionCode
                    ? order.redemptionCode.toUpperCase()
                    : '-'}
                </TableCell>
                <TableCell
                  className={`flex-1 ${handleStatusColor(
                    order.status
                  )} font-bold`}
                >
                  {order.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  )
}

export default Page
