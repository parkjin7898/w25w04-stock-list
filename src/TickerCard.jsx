import React, {useEffect, useState} from 'react'

const TickerCard = ({ ticker }) => {
// stockData 상태 변수를 추가, 초기값은 null
const [stockData, setStockData] = useState(null)
// error 상태 변수를 추가, 초기값은 null
const [error, setError] = useState(null)
// loading 상태 변수를 추가, 초기값은 true
const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
                    `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`)}`
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error('네트워크 응답이 정상적이지 않습니다.')
        }

        const data = await response.json()
        // console.log(data.chart.result[0])
        setStockData(data.chart.result[0])

      } catch (err) {
        console.error("데이터를 가져오는 데 실패했습니다:", err)
        setError(`${ticker} 데이터를 가져오는 데 실패했습니다.`)
        // 에러 상태 업데이트
      }  finally {
        // 로딩 상태를 false로 설정
        setLoading(false);
      }
    }
    fetchStockData()
  }, [ticker])

  // loading 상태가 true이면 로딩 스켈레톤 UI 표시하고 함수 종료
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 mx-auto animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    )
  }

  // error 상태가 있으면 에러 메시지 표시하고 함수 종료
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-80 mx-auto">
        <strong className="font-bold">에러!</strong>
        <div className="block sm:inline ml-2">{error}</div>
      </div>
    )
  }

  // stockData가 null이거나, stockData.meta가 없으면
  // 경고 메시지 표시하고 함수 종료
  if (!stockData || !stockData.meta) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative w-80 mx-auto">
          <strong className="font-bold">경고!</strong>
          <div className="block sm:inline ml-2">주식 데이터가 없습니다.</div>
      </div>
    )
  }

  const meta = stockData.meta
  const name = meta.longName
  const currentPrice = meta.regularMarketPrice
  const previousClose = meta.chartPreviousClose
  const priceChange = currentPrice - previousClose
  const isPositive = priceChange >= 0

  const isKoreanStock = ticker.endsWith('.KS') || ticker.endsWith('.KQ')
  const currencyMarker = isKoreanStock ? '₩' : '$'

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-80
    transform transition duration-500 hover:scale-105">
      {/* bg-white: 배경색을 흰색으로,
      rounded-lg: 모서리를 둥글게,
      shadow-xl: 그림자 효과를 크게,
      p-6: 패딩을 6으로 설정,
      w-80: 가로폭을 80으로 설정,
      transform transition duration-500 hover:scale-105:
      hovering시에 500ms동안 scale하는데, 크기가 5% 커지는 애니메이션 효과 적용 */}
      <div className="flex justify-between items-center mb-4"> 
        {/* flex: 플렉스 박스 사용,
        justify-between: 아이템들을 양 끝으로 정렬,
        items-center: 아이템들을 세로축 중앙 정렬,
          -> 이건 name과 ticker가 크기가 다를 때 유용
        mb-4: 아래쪽 마진을 4로 설정 */}
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <div className="text-sm font-semibold text-gray-500">{ticker}</div>
        {/* 두 개 크기가 서로 다르지만
        세로축 중앙 정렬되어서 보기 좋음 */}
      </div>
      <div className="border-b border-gray-200 mb-4"></div>
      {/* border-b: 아래쪽에만 테두리 적용,
      border-gray-200: 테두리 색상을 연한 회색으로,
      mb-4: 아래쪽 마진을 4로 설정 */}
      
      <div className={`text-4xl font-extrabold mb-2
                      ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {/* template literal (백틱) 사용
        3항연산자를 써서 isPositive에 따라
        글자 색상을 초록색 또는 빨간색으로 설정 */}
        {/* templat literal이란? 백틱(`)으로 감싸서 문자열 안에 변수나 표현식을 삽입할 수 있는 방법
        파이썬의 f-string과 비슷 */}
        {currencyMarker}{isKoreanStock? currentPrice.toLocaleString() : currentPrice.toFixed(2)}
      </div>

      <div className={`text-base font-semibold
                      ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
        {/* template literal (백틱) 사용
        3항연산자를 써서 isPositive에 따라
        글자 색상을 초록색 또는 빨간색으로 설정 */}
        {isPositive ? '▲' : '▼'} {isKoreanStock? priceChange.toLocaleString() : priceChange.toFixed(2)}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        전일 종가: {currencyMarker}{isKoreanStock? previousClose.toLocaleString() : previousClose.toFixed(2)}
      </div>
    </div>
  )
}

export default TickerCard