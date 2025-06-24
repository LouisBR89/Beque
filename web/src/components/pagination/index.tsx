import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import style from './style.module.css'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
// const pagination = {
//   perPage: 10,
//   currentPage: 1,
//   countData: 100,
//   total: Math.ceil(100 / 10),
// }

interface PaginationProps {
  perPage: number // registros por página
  currentPage: number // página atual
  totalData: number // total de registros
  totalPages: number // total paáginas
}

interface PageButtonProps {
  page: number;
  isCurrent?: boolean;
  totalPages: number;
  onPageChange: (page: number, perPage?: number) => void;
}

function PageButton({ page, onPageChange, isCurrent = false }: PageButtonProps) {
  return (
    <button
      type='button'
      className={`${style.pageButton}  ${isCurrent ? style.currentPage : ""}`}
      disabled={isCurrent}
      onClick={() => onPageChange(page)}
    >
      <span>
        {page}
      </span>
    </button>
  )
}


function FisrtPageButton({ page, onPageChange }: PageButtonProps) {
  return (
    <button
      className={`${style.pageButton} ${page === 1 ? style.notAllowed : ""}`}
      disabled={page === 1}
      onClick={() => onPageChange(page)}
    >
      <ChevronsLeft strokeWidth={1} />
    </button>
  )
}

function PreviousPageButton({ page, onPageChange }: PageButtonProps) {
  return (
    <button
      className={`${style.pageButton} ${page === 1 ? style.notAllowed : ""}`}
      disabled={page === 1}
      onClick={() => onPageChange(page)}
    >
      <ChevronLeft strokeWidth={1} />
    </button>
  )
}

function NextPageButton({ page, onPageChange, totalPages }: PageButtonProps) {
  const isLastPage = page === totalPages
  return (
    <button
      className={`${style.pageButton} ${isLastPage ? style.notAllowed : ""}`}
      disabled={isLastPage}
      onClick={() => onPageChange(page)}
    >
      <ChevronRight strokeWidth={1} />
    </button>
  )
}

function LastPageButton({ page, onPageChange, totalPages }: PageButtonProps) {
  const isLastPage = page === totalPages
  return (
    <button
      className={`${style.pageButton} ${isLastPage ? style.notAllowed : ""}`}
      disabled={isLastPage}
      onClick={() => onPageChange(page)}
    >
      <ChevronsRight strokeWidth={1} />
    </button>
  )
}

export function Pagination(props: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handlePageChange = (page: number, perPage?: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))

    //eslint-disable-next-line
    perPage && params.set('perPage', String(perPage))
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={style.container}>

      <div className={style.countPerPage}>
        <select
          defaultValue={props.perPage}
          onChange={(e) => { handlePageChange(1, Number(e.target.value)) }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className={style.registersCount}>
        <span>
          {props.perPage * props.currentPage} de {props.totalData} registros
        </span>
      </div>

      <div className={style.pages}>
        <FisrtPageButton 
          page={props.currentPage}
          totalPages={props.totalPages}
          onPageChange={() => handlePageChange(1)}
        />
        <PreviousPageButton 
          page={props.currentPage}
          totalPages={props.totalPages}
          onPageChange={() => handlePageChange(props.currentPage - 1)}
        />
        {
          Array.from({ length: props.totalPages }, (_, i) => i + 1).map((index) => (
            <PageButton
              key={index}
              page={index}
              isCurrent={index === props.currentPage}
              totalPages={props.totalPages}
              onPageChange={() => handlePageChange(index)}
            />
          ))
        }
        <NextPageButton 
          page={props.currentPage} 
          totalPages={props.totalPages} 
          onPageChange={() => handlePageChange(props.currentPage + 1)}
          />
        <LastPageButton 
          page={props.currentPage} 
          totalPages={props.totalPages} 
          onPageChange={() => handlePageChange(props.totalPages)}
          />
      </div>
    </div>
  )
}
