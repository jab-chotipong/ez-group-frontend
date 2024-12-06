'use client'
import Dialog, { DialogProps } from '@/components/AlertDialog'
import { InputWithLabel } from '@/components/InputLabel'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { verifyCode } from '@/services/codesService'
import { getBalance, searchCustomers } from '@/services/customerServices'
import { createOrder } from '@/services/orderServices'
import { searchProducts } from '@/services/productService'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { IoMdAdd } from 'react-icons/io'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [productCount, setProductCount] = useState<number>(1)
  const [customers, setCustomers] = useState([])
  const [balance, setBalance] = useState<number | null>(null)
  const [discount, setDiscount] = useState<number>(0)
  const [products, setProducts] = useState<any>([])
  const [addedProducts, setAddedProducts] = useState<any[]>([])
  const methods = useForm()
  const { handleSubmit, getValues, watch, setError, clearErrors } = methods
  const customer = watch('customerId')
  const router = useRouter()
  const [dialog, setDialog] = useState<DialogProps | null>(null)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const onSelect = (option) => {
    setAddedProducts([...addedProducts, option])
  }

  const getTotalPrice = () => {
    const total = addedProducts.reduce(
      (prev, cur) => prev + parseFloat(cur.price) * parseInt(cur.quantity || 0),
      0
    )
    return (total * (100 - discount)) / 100
  }

  const getCustomers = async (term: string) => {
    try {
      const response = await searchCustomers(term)
      setCustomers(response)
    } catch (error) {
      console.error(error)
    }
  }

  const getProducts = async (term: string) => {
    try {
      const response = await searchProducts(term)
      setProducts(response)
    } catch (error) {
      console.error(error)
      return []
    }
  }

  const verifyRedemptionCode = async () => {
    try {
      const { discount } = await verifyCode(getValues('redemptionCode'))
      setDiscount(parseFloat(discount))
      clearErrors('redemptionCode')
    } catch (error: any) {
      setError('redemptionCode', {
        type: 'invalid',
        message: error.response.data.error,
      })
    }
  }

  const postOrder = async (data) => {
    try {
      const response = await createOrder(data)
      console.log(response)
      if (response.status === 201) {
        setDialogOpen(true)
        setDialog({
          title: 'Order created successfully',
          confirmText: 'Back to orders',
          cancelText: 'Create more',
          onConfirm: () => router.push('/orders'),
          onCancel: () => {
            setDialogOpen(false)
            window.location.reload()
          },
        })
      } else {
        setDialog({
          title: 'Cannot create the order',
          confirmText: 'Back to orders',
          cancelText: 'Try again',
          onConfirm: () => router.push('/orders'),
          onCancel: () => {
            setDialogOpen(false)
            window.location.reload()
          },
        })
      }
    } catch (error) {
      setDialog({
        title: 'Cannot create the order',
        confirmText: 'Back to orders',
        cancelText: 'Try again',
        onConfirm: () => router.push('/orders'),
        onCancel: () => {
          setDialogOpen(false)
          window.location.reload()
        },
      })
    }
  }

  useEffect(() => {
    const getCustomerBalance = async () => {
      try {
        if (!customer) return
        const response = await getBalance(customer)
        setBalance(response.balance)
      } catch (error) {
        console.error(error)
      }
    }

    getCustomerBalance()
  }, [customer])

  const onSubmit = handleSubmit((data) => {
    // format data
    const products = []
    for (let i = 0; i < productCount; i++) {
      if (data[`product_${i}`] && data[`quantity_${i}`]) {
        const product = {
          productId: data[`product_${i}`],
          quantity: parseInt(data[`quantity_${i}`]),
        }
        products[i] = product
      }
      delete data[`product_${i}`]
      delete data[`quantity_${i}`]
    }
    data.products = products
    postOrder(data)
  })

  return (
    <div className='p-4 flex flex-col w-full gap-8'>
      <h1 className='text-2xl text-gray-700 font-semibold flex items-center gap-2'>
        <Link className='font-normal text-gray-500' href='/orders'>
          Orders
        </Link>{' '}
        <span>{'>'}</span>
        Create new order
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className='grid grid-cols-3'>
          <div className='flex gap-4 flex-col items-start col-span-2'>
            <div className='flex gap-4 items-end'>
              <Combobox
                onSearchChange={getCustomers}
                label='Customer'
                name='customerId'
                placeholder='Select customer...'
                options={customers}
              />
              {balance && <p>Current balance : ${balance}</p>}
            </div>

            <div className='flex flex-col gap-4'>
              {new Array(productCount).fill(null).map((count, i) => (
                <div key={i} className='flex items-end gap-4'>
                  <Combobox
                    onSearchChange={getProducts}
                    name={`product_` + i}
                    label={i === 0 ? 'Product' : ''}
                    placeholder='Select product...'
                    options={products}
                    onSelect={onSelect}
                  />
                  <InputWithLabel
                    placeholder='Enter quantity...'
                    type='number'
                    disabled={!getValues(`product_` + i)}
                    id={`quantity_` + i}
                    onBlur={(e) => {
                      setAddedProducts(
                        addedProducts.map((product, index) =>
                          index === i
                            ? { ...product, quantity: parseInt(e.target.value) }
                            : product
                        )
                      )
                    }}
                    min='1'
                    label={i === 0 ? 'Quantity' : ''}
                  />
                </div>
              ))}
              <Button
                type='button'
                variant='outline'
                onClick={() => setProductCount((prev) => prev + 1)}
              >
                <IoMdAdd />
                Add product
              </Button>
            </div>
            <div className='flex gap-4 items-end'>
              <InputWithLabel
                placeholder='Enter code...'
                type='string'
                id='redemptionCode'
                label='Code'
                width='250px'
              />
              <Button
                type='button'
                variant='default'
                onClick={() => verifyRedemptionCode()}
              >
                APPLY
              </Button>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <p>Order summary</p>
            {addedProducts.map((product, i) => (
              <div key={i}>
                {product.quantity && (
                  <p key={i}>
                    {product.quantity}x {product.label}- $
                    {product.price * product.quantity}
                  </p>
                )}
              </div>
            ))}
            {discount > 0 && (
              <p className='text-green-500 font-bold'>{`${discount}% discount`}</p>
            )}
            <p>Total price: ${getTotalPrice().toFixed(2)}</p>
            <Dialog {...dialog} open={dialogOpen}>
              <Button variant='default' type='submit'>
                Create Order
              </Button>
            </Dialog>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default Page
