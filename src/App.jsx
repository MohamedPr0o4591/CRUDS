import React, { useEffect, useState } from 'react'
import './App.css'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { Container } from 'react-bootstrap'
import { DeleteOutline, DeleteRounded, EditNoteRounded } from '@mui/icons-material'



let tmp;

function App() {

  const [titleValue, setTitleValue] = useState('')
  const [priceValue, setPriceValue] = useState('')
  const [taxesValue, setTaxesValue] = useState('')
  const [adsValue, setAdsValue] = useState('')
  const [discountValue, setDiscountValue] = useState('')
  const [total, setTotal] = useState('')
  const [countValue, setCountValue] = useState('')
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [productData, setProductData] = useState([])
  const [mood, setMood] = useState('create')
  const [searchMood, setSearchMood] = useState('all')
  const [active, setActive] = useState(false)



  // Reset values

  const resetValues = _ => {
    setTitleValue('')
    setPriceValue('')
    setTaxesValue('')
    setAdsValue('')
    setDiscountValue('')
    setTotal('')
    setCountValue('')
    setCategory('')

  }

  const getTotal = _ => {
    if (priceValue !== '' || taxesValue !== '' || adsValue !== '') {
      let result = (+priceValue + +taxesValue + +adsValue) - +discountValue;

      setTotal(result);
    } else setTotal('')

  }

  const handleSetProduct = _ => {
    setActive(true)
    let newProduct = {
      title: titleValue.toLowerCase(),
      price: priceValue,
      taxes: taxesValue,
      ads: adsValue,
      discount: discountValue,
      total: total,
      category: category.toLowerCase(),
    }


    if (titleValue !== '' && priceValue !== '' && taxesValue !== '' && adsValue !== '' && category !== '' && countValue <= 100) {

      setActive(false)

      if (mood === 'create') {
        if (countValue > 1) {

          for (let i = 0; i < countValue; i++) {
            setProductData(prev => {
              let newArr = [...prev]
              newArr.push(newProduct);
              localStorage.data = JSON.stringify(newArr);
              return newArr;
            })
          }

        } else {
          setProductData(prev => {
            let newArr = [...prev]
            newArr.push(newProduct);
            localStorage.data = JSON.stringify(newArr);
            return newArr;
          })
        }

      } else {

        setProductData(prev => {
          let newArr = [...prev];
          newArr[tmp] = newProduct;
          localStorage.data = JSON.stringify(newArr)
          console.log(tmp);
          return newArr
        })


        setMood('create')
      }


      resetValues()
    }

  }

  useEffect(() => {
    if (localStorage.data) {
      setProductData(
        JSON.parse(localStorage.data)
      )
    }
  }, [])


  // delete data
  const handleDeletePro = i => {

    setProductData(prev => {
      let newArr = [...prev];
      newArr.splice(i, 1);
      localStorage.data = JSON.stringify(newArr)
      return newArr;
    })

  }

  // update item
  const handleUpdatePro = i => {

    setTitleValue(productData[i].title)
    setPriceValue(productData[i].price)
    setTaxesValue(productData[i].taxes)
    setAdsValue(productData[i].ads)
    setDiscountValue(productData[i].discount)
    setTotal(productData[i].total)
    setCategory(productData[i].category)
    tmp = i

    setMood('update')

    scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  }

  // search

  const handleSearch = _ => {

    if (search !== '') {
      if (searchMood === 'title') {
        setProductData(prev => {
          let newArr = [...prev]
          let filterPro = JSON.parse(localStorage.data).filter(item => ((item.title).toLowerCase()).includes(search.toLowerCase()))
          return filterPro;
        })
      } else if (searchMood === 'category') {
        setProductData(prev => {
          let newArr = [...prev];
          let filterPro = JSON.parse(localStorage.data).filter(item => item.category.toLowerCase().includes(search.toLowerCase()))
          return filterPro;
        })
      } else {
        setProductData(prev => {
          let newArr = [...prev]
          let filterPro = JSON.parse(localStorage.data).filter(item => item.title.toLowerCase().includes(search.toLowerCase())
            || item.category.toLowerCase().includes(search.toLowerCase())
            || item.price.includes(search)
            || item.taxes.includes(search)
            || item.ads.includes(search)
            || item.discount.includes(search)
          )
          return filterPro;
        })
      }

    } else setProductData(JSON.parse(localStorage.data))

  }

  const deleteAll = _ => {
    setProductData(prev => {
      let newArr = [...prev]
      newArr = []
      localStorage.data = JSON.stringify(newArr)
      return newArr
    })
  }

  return (
    <div className='app'>

      <Container>

        <h1 >
          cruds
        </h1>

        <h3 >
          create | read | update | delete | search
        </h3>

        <div className="details">
          <Stack gap={2} my={3}>

            <input
              type='text'
              value={titleValue}
              onChange={e => setTitleValue(e.target.value)}
              placeholder={`${active && titleValue === '' ? 'Please, enter the product title' : 'Title'}`}
              style={{
                background: `${active && titleValue === '' ? 'darkred' : '#252020'}`,
                transform: `scale(${active && titleValue === '' ? '1.02 ,1.02' : '1 ,1'})`,
              }}
            />

            <Box className='details-prices-component'>

              <input
                type='number'
                placeholder={`${active && priceValue === '' ? 'Please, enter the product price' : 'Price'}`}
                value={priceValue}
                onChange={e => setPriceValue(e.target.value)}
                onKeyUp={getTotal}
                style={{
                  background: `${active && priceValue === '' ? 'darkred' : '#252020'}`,
                  transform: `scale(${active && priceValue === '' ? '1.02 ,1.02' : '1 ,1'})`,
                }}
              />

              <input
                type='number'
                value={taxesValue}
                onChange={e => setTaxesValue(e.target.value)}
                onKeyUp={getTotal}
                placeholder={`${active && taxesValue === '' ? 'Please, enter the product taxes' : 'Taxes'}`}
                style={{
                  background: `${active && taxesValue === '' ? 'darkred' : '#252020'}`,
                  transform: `scale(${active && taxesValue === '' ? '1.02 ,1.02' : '1 ,1'})`,
                }}
              />

              <input
                type='number'
                value={adsValue}
                onChange={e => setAdsValue(e.target.value)}
                onKeyUp={getTotal}
                placeholder={`${active && adsValue === '' ? 'Please, enter the product ADS' : 'ADS'}`}
                style={{
                  background: `${active && adsValue === '' ? 'darkred' : '#252020'}`,
                  transform: `scale(${active && adsValue === '' ? '1.02 ,1.02' : '1 ,1'})`,
                }}
              />

              <input
                type='number'
                placeholder='Discount'
                value={discountValue}
                onChange={e => setDiscountValue(e.target.value)}
                onKeyUp={getTotal}
              />

              <div >
                <span
                  className='total'
                  style={{
                    background: total ? '#0e99' : 'darkred',
                  }}
                >
                  {
                    total ? (`${total.toLocaleString()} L.E`) : null
                  }
                </span>
              </div>

            </Box>

            {
              mood === 'create' ? (
                <input
                  type='text'
                  placeholder='Count 1 ~ 100'
                  value={countValue}
                  onChange={e => setCountValue(e.target.value)}
                  style={{
                    background: `${active && countValue > 100 ? 'darkred' : '#252020'}`,
                    transform: `scale(${active && countValue > 100 ? '1.02 ,1.02' : '1 ,1'})`,
                  }}
                />
              ) : null
            }

            <input
              type='text'
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder={`${active && category === '' ? 'Please, enter the product category' : 'Category'}`}
              style={{
                background: `${active && category === '' ? 'darkred' : '#252020'}`,
                transform: `scale(${active && category === '' ? '1.02 ,1.02' : '1 ,1'})`,
              }}
            />

            <Button
              variant='contained'
              color={`${mood === 'create' ? 'primary' : 'success'}`}
              sx={{
                textTransform: 'capitalize',
              }}
              onClick={handleSetProduct}
            >
              {
                mood === 'create' ? 'Create' : 'Update'
              }
            </Button>

            <input
              type='text'
              placeholder={`${searchMood === 'all' ? 'Search' : searchMood === 'title' ? 'Search by title' : 'Search by Category'}`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyUp={handleSearch}
            />

            <Stack direction={'row'} gap={2}>

              <Button
                variant='contained'
                color='primary'
                sx={{
                  textTransform: 'capitalize',
                  flexGrow: 1,
                }}
                onClick={_ => setSearchMood('title')}
              >
                search by title
              </Button>

              <Button
                variant='contained'
                color='primary'
                sx={{
                  textTransform: 'capitalize',
                  flexGrow: 1,
                }}
                onClick={_ => setSearchMood('category')}
              >
                search by category
              </Button>

            </Stack>

            {
              productData.length > 0 ? (
                <Button
                  variant='contained'
                  color='error'
                  onClick={deleteAll}
                >
                  Delete All ({productData.length})
                </Button>
              ) : null
            }

          </Stack>
        </div>

        <div className="data-grid">

          <table className='w-100'>
            <thead >
              <tr >
                <th >
                  id
                </th>

                <th >
                  title
                </th>

                <th >
                  price
                </th>

                <th >
                  taxes
                </th>

                <th >
                  ads
                </th>

                <th >
                  discount
                </th>

                <th >
                  total
                </th>

                <th >
                  category
                </th>

                <th >
                  action
                </th>
              </tr>
            </thead>

            <tbody >
              {
                productData.length ? (
                  productData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td >
                          {index + 1}
                        </td>

                        <td >
                          {item.title}
                        </td>

                        <td >
                          {item.price}
                        </td>

                        <td >
                          {item.taxes}
                        </td>

                        <td >
                          {item.ads}
                        </td>

                        <td >
                          {item.discount}
                        </td>

                        <td >
                          {item.total}
                        </td>

                        <td >
                          {item.category}
                        </td>

                        <td >

                          <Stack direction={'row'} gap={2} justifyContent={'center'}>

                            <IconButton
                              color='success'
                              onClick={_ => handleUpdatePro(index)}
                            >
                              <EditNoteRounded />
                            </IconButton>

                            <IconButton
                              color='error'
                              onClick={_ => handleDeletePro(index)}
                            >
                              <DeleteRounded />
                            </IconButton>

                          </Stack>

                        </td>
                      </tr>
                    )
                  })
                ) : null
              }
            </tbody>
          </table>

        </div>
      </Container>

    </div>
  )
}

export default App
