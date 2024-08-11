export const CoreFeed = () =>{
    return(
        <>
        
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
    <div className="lg:flex lg:items-center lg:justify-between lg:gap-4">
      <h2 className="shrink-0 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Questions (147)</h2>

      <form className="mt-4 w-full gap-4 sm:flex sm:items-center sm:justify-end lg:mt-0">
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full flex-1 lg:max-w-sm">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="simple-search" className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 ps-9 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Search Questions & Answers" required />
        </div>

        <button type="button" data-modal-target="question-modal" data-modal-toggle="question-modal" className="mt-4 w-full shrink-0 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0 sm:w-auto">Ask a question</button>
      </form>
    </div>

    <div className="mt-6 flow-root">
      <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
        <div className="space-y-4 py-6 md:py-8">
          <div className="grid gap-4">
            <div>
              <span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0"> 3 answers </span>
            </div>

            <a href="#" className="text-xl font-semibold text-gray-900 hover:underline dark:text-white">“The specs say this model has 2 USB ports. The one I received has none. Are they hidden somewhere?”</a>
          </div>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">It’s a USB-C port it’s a smaller port. Not the regular size USB port. See the picture below. It fits the newer Apple chargers.</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Answered 1 day ago by
            <a href="#" className="text-gray-900 hover:underline dark:text-white">Bonnie Green</a>
          </p>
        </div>

        <div className="space-y-4 py-6 md:py-8">
          <div className="grid gap-4">
            <div>
              <span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0"> 1 answer </span>
            </div>

            <a href="#" className="text-xl font-semibold text-gray-900 hover:underline dark:text-white">“Is this just the monitor?”</a>
          </div>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">It's an all-in-one (AIO). Which means everything in one structure. So it's not just a monitor it uses Apple's operating System, macOS and it has storage, CPU, GPU etc.</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Answered 1 day ago by
            <a href="#" className="text-gray-900 hover:underline dark:text-white">Jese Leos</a>
          </p>
        </div>

        <div className="space-y-4 py-6 md:py-8">
          <div className="grid gap-4">
            <div>
              <span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0"> 7 answers </span>
            </div>
            <a href="#" className="text-xl font-semibold text-gray-900 hover:underline dark:text-white">“For an inexpert 85-year-old general user with a ten-year old iMac (OSX Yosemite version 10.10.5), is this latest model 24" iMac with Retina 4.5K display Apple M1 8GB memory - 256GB SSD a decent upgrade?”</a>
          </div>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">It's basically the same system as your older machine, but bigger, lighter and faster. There is no disc drive and it has fewer ports.</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Answered 2 days ago by
            <a href="#" className="text-gray-900 hover:underline dark:text-white">Bonnie Green</a>
          </p>
        </div>

        <div className="space-y-4 py-6 md:py-8">
          <div className="grid gap-4">
            <div>
              <span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0"> 32 answers </span>
            </div>

            <a href="#" className="text-xl font-semibold text-gray-900 hover:underline dark:text-white">“I just brought home the Imac24". It saysthe mouse and Keyboard are wireless. Where do I install the power for them?”</a>
          </div>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">You can charge the mouse and keyboard with a lightning charger. Once charged, they last months before having to charge again.</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Answered 2 days ago by
            <a href="#" className="text-gray-900 hover:underline dark:text-white">Roberta Casas</a>
          </p>
        </div>

        <div className="space-y-4 py-6 md:py-8">
          <div className="grid gap-4">
            <div>
              <span className="inline-block rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300 md:mb-0"> 4 answers </span>
            </div>

            <a href="#" className="text-xl font-semibold text-gray-900 hover:underline dark:text-white">“Does this include the keyboard and mouse?”</a>
          </div>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">Yes it does, color matched to the Mac. And the keyboard has Touch ID.</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Answered 1 week ago by
            <a href="#" className="text-gray-900 hover:underline dark:text-white">Joseph McFallen</a>
          </p>
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-center lg:justify-start">
      <button type="button" className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">View more questions</button>
    </div>
  </div>
</section>

<div id="question-modal" aria-hidden="true" className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden antialiased antialiased md:inset-0">
  <div className="relative max-h-full w-full max-w-xl p-4">
    <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ask a question</h3>
        <button type="button" className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="question-modal">
          <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      <form className="p-4 md:p-5">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label htmlFor="question" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Your question <span className="text-gray-500 dark:text-gray-400">(150-1000 characters)</span></label>
            <textarea id="question" rows={6} class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" required=""></textarea>
          </div>
          <div className="col-span-2 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="question-type" className="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white">
                <span className="me-1">Question type</span>
                <button type="button" data-tooltip-target="tooltip-dark" data-tooltip-style="dark" className="ml-1">
                  <svg aria-hidden="true" className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                  <span className="sr-only">Details</span>
                </button>
                <div id="tooltip-dark" role="tooltip" className="tooltip invisible absolute z-10 inline-block max-w-sm rounded-lg bg-gray-900 px-3 py-2 text-xs font-normal text-white opacity-0 shadow-sm dark:bg-gray-700">
                  Choose your question type to get a faster answer.
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </label>
              <select id="question-type" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                <option value="technical">Technical Question</option>
                <option value="shipment">Shipment Question</option>
                <option value="payment">Payment Issue</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="priority-type" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Priority</label>
              <select id="priority-type" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                <option value="very-high">Very High</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div className="col-span-2">
            <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Upload files <span className="text-gray-500 dark:text-gray-400">(Optional)</span></p>
            <div className="flex w-full items-center justify-center">
              <label htmlFor="dropzone-file" className="dark:hover:bg-bray-800 flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>

          <div className="col-span-2">
            <div className="flex items-center">
              <input id="link-checkbox" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
              <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">I have read and agree with the <a href="#" className="text-primary-600 hover:underline dark:text-primary-500">terms and conditions</a>.</label>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
          <button type="submit" className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit question</button>
          <button type="button" data-modal-toggle="question-modal" className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</div>

        </>
    )
}