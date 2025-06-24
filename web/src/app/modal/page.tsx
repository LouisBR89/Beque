import style from './modal.module.css'
interface Category {
  id: number;
  icon: string;
  name: string;
}
export default async function Modal() {

  const categoriesRequest = await fetch('http://localhost:3333/categories')
  const categories = await categoriesRequest.json()

  const banksRequest = await fetch('http://localhost:3333/banks')
  const banks = await banksRequest.json()

  return (
    <div className={style.container}>
      <div className={style.modal}>
        <div className={style.header}>
          <div>
            <h2>Adicionar Transação</h2>
          </div>
        </div>

        <div className={style.content}>
          <form action="">
            <div>
              <label htmlFor="description">Descrição</label>
              <input type="text" id="description" name="description" required />
            </div>

            <div>
              <label htmlFor="type">Tipo</label>
              <select id="type" name="type" required>
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>
            </div>

            <div>
              <label htmlFor="amount">Valor</label>
              <input type="number" id="amount" name="amount" required />
            </div>

            <div>
              <label htmlFor="bank">Banco</label>
              <select id="bank" name="bank" required >
                {banks.map((bank: Category) => (
                  <option key={bank.id} value={bank.id}>{bank.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category">Categoria</label>
              <select id="category" name="category" required>
                {categories.map((category: Category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date">Data</label>
              <input 
                type="datetime-local"
                id="date" 
                name="date" 
                required 
                defaultValue={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <button type="submit">Adicionar</button>
          </form>
        </div>

        {/* <div className={style.footer}>
          <button>
            Cancelar
          </button>
          <button>
            Confirmar
          </button>
        </div> */}
      </div>
    </div>
  )
}
