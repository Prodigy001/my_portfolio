function Transactions() {
  return (
    <main>
      <section className="bg-white rounded-2xl p-6 mb-6">
        <h1 className="font-bold text-2xl text-[#1A1A1A] mb-2">Transactions</h1>
        <p className="text-[#1A1A1A5C] text-base">
          View all your transaction history and details
        </p>
      </section>

      <section className="bg-white rounded-2xl p-6">
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#1A1A1A5C] text-lg mb-4">
              Transactions content
            </p>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#EBF0FF] rounded-full">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Transactions;
