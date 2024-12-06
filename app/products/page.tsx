'use client'
import { getProducts, updateProducts } from '@/services/productService'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Product, ProductStatus } from '@/types/product'
import { FormProvider, useForm } from 'react-hook-form'
import { InputWithLabel } from '@/components/InputLabel'
import Dialog from '@/components/AlertDialog'
import { SelectOption } from '@/components/Select'

const Page = () => {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const methods = useForm({})
  const { handleSubmit, setValue } = methods

  const onDialogOpen = (product) => {
    setValue('id', product.id)
    setValue('name', product.name)
    setValue('price', product.price)
    setValue('stock', product.stock)
    setValue('status', product.status)
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      data.stock = parseInt(data.stock)
      data.price = parseFloat(data.price)
      const response = await updateProducts(data.id, data)
      if (response.status === 200) setIsUpdated(true)
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const { data, ...rest } = await getProducts(page)
        setProducts(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [isUpdated])

  return (
    <div className='p-4 flex flex-col w-full gap-4'>
      <h1 className='text-2xl text-gray-700 font-semibold'>Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className='flex'>
              <TableHead className='flex-1'>Id</TableHead>
              <TableHead className='flex-[2]'>Product Name</TableHead>
              <TableHead className='flex-1'>Price</TableHead>
              <TableHead className='flex-1'>Stock</TableHead>
              <TableHead className='flex-1'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <Dialog
            onOpenChange={() => {
              setIsUpdated(false)
            }}
            open={openDialog}
            desc={
              isUpdated ? (
                <>
                  <p>Product updadted successfully</p>
                </>
              ) : (
                <FormProvider {...methods}>
                  <form>
                    <UpdateDialog />
                  </form>
                </FormProvider>
              )
            }
            title='Update Product'
            confirmText={isUpdated ? undefined : 'Update'}
            onConfirm={onSubmit}
            cancelText={isUpdated ? 'Close' : 'Cancel'}
            onCancel={() => setOpenDialog(false)}
          >
            <TableBody onClick={() => setOpenDialog(true)}>
              {products.map((product: Product) => (
                <TableRow
                  className='flex'
                  key={product.id}
                  onClick={() => onDialogOpen(product)}
                >
                  <TableCell className='flex-1'>{product.id}</TableCell>
                  <TableCell className='flex-[2]'>{product.name}</TableCell>
                  <TableCell className='flex-1'>${product.price}</TableCell>
                  <TableCell className='flex-1'>{product.stock}</TableCell>
                  <TableCell className='flex-1'>{product.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Dialog>
        </Table>
      ) : (
        <p>No products available</p>
      )}
    </div>
  )
}

const statusOptions = [
  {
    label: 'IN-STOCK',
    value: ProductStatus.INSTOCK,
  },
  {
    label: 'RESERVED',
    value: ProductStatus.RESERVED,
  },
  {
    label: 'SOLD',
    value: ProductStatus.SOLD,
  },
]

const UpdateDialog = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <InputWithLabel type='string' label='Name' id='name' />
      <InputWithLabel type='number' min='0' label='Price' id='price' />
      <InputWithLabel type='number' min='0' label='Stock' id='stock' />
      <SelectOption
        options={statusOptions}
        label='Status'
        name='status'
        placeholder='Select status...'
        width='w-[382px]'
      />
    </div>
  )
}

export default Page
