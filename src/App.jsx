import React from 'react'
import TickerCard from './TickerCard'

const stocks = [
  { ticker: 'NVDA'},
  { ticker: 'TSLA'},
  { ticker: 'GOOGL'},
  { ticker: '005930.KS'},
]

function App() {
  return (
    <div className='bg-gray-100 min-h-screen p-8 flex flex-col items-center'>
      {/* bg-gray-100: 배경색을 연한 회색으로,
      min-h-screen : 최소 높이를 화면 전체로 설정,
      p-8: 패딩을 8로 설정,
      flex flex-col: 플렉스 박스를 세로 방향으로 설정,
      items-center: 아이템들을 가로축 중앙 정렬 */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10">오늘의 주식 시세</h1>
      {/* text 4xl: 글자 크기를 4xl로,
      font-bold: 글자를 굵게,
      text-gray-800: 글자 색상을 진한 회색으로,
      mb-10: 아래쪽 마진을 10으로 설정 */}
      <div className="grid grid-cols-1 sm:grid-cols-2
        lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {/* grid grid-cols-1: 그리드 레이아웃을 1열로 설정,
        gap-6: 아이템들 사이의 간격을 6으로 설정 */}
        {/* 반응형 웹사이트:
        sm인 경우 2열, lg인 경우 3열, xl인 경우 4열로 설정,
        w-full: 가로폭을 100%로 설정,
        max-w-7xl: 최대 가로폭을 7xl로 설정 */}
        {
          stocks.map(stock => (
            <TickerCard 
              key={stock.ticker} 
              ticker={stock.ticker} 
            />
          ))
        }
      </div>
    </div>
  )
}



export default App