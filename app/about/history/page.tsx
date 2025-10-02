import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "History of Pio Duran - MDRRMO",
  description: "Discover the rich heritage and evolution of Pio Duran municipality",
}

export default function HistoryPage() {
  return (
    <div className="font-sans bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="bg-repeat w-full h-full"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CiAgPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0iTTAgMEg1MFY1MEgweiIgc3Ryb2tlPSIjZmNkNTMwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                History of <span className="text-yellow-500">Pio Duran</span>
              </h1>
              <p className="text-xl mb-6">Discover the rich heritage and evolution of our beloved municipality</p>
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-500 text-blue-950 px-4 py-2 rounded-full font-semibold">
                  <i className="fas fa-map-marker-alt mr-2"></i>Albay Province
                </div>
                <div className="bg-blue-800 px-4 py-2 rounded-full font-semibold">
                  <i className="fas fa-calendar-alt mr-2"></i>Founded 1963
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-yellow-500 rounded-full opacity-20 absolute -top-6 -left-6"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-950 rounded-full opacity-20 absolute -bottom-6 -right-6"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-yellow-500 floating-animation">
                  <Image
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop"
                    alt="Pio Duran Landscape"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* History Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">History of the Municipality</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-blue-950 p-8 text-white">
                <div className="mb-6">
                  <div className="text-yellow-500 text-5xl mb-2">1928</div>
                  <h3 className="text-xl font-bold">Early Settlement</h3>
                </div>
                <div className="mb-6">
                  <div className="text-yellow-500 text-5xl mb-2">1939</div>
                  <h3 className="text-xl font-bold">Town Creation</h3>
                </div>
                <div>
                  <div className="text-yellow-500 text-5xl mb-2">1963</div>
                  <h3 className="text-xl font-bold">Republic Act 3817</h3>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <p className="text-gray-700 mb-4">
                  Pioduran was first known to early settlers as Panganiran because of its location facing 20 kms.
                  stretch of Panganiran Bay. Its rich coastal resources particularly the marshland tree, Marokbarok
                  superseded the popularity of the bay itself that later, the place became known as Marokbarok. The
                  tree's specific name was changed to Malacbalac and it also became the name of the place.
                </p>
                <p className="text-gray-700 mb-4">
                  Originally, the barangays covered by Pioduran were part of the municipalities of Guinobatan, Ligao and
                  Jovellar. The attempt to create Malacbalac as a separate town was initiated in Year 1928 by Don
                  Hilario Peñaflor and Prescillano Osial but it was set aside by then Congressman Pedro Sabido who gave
                  priority to the construction of a national road, now known as the 39kms. Ligao – Pioduran Road.
                </p>
                <p className="text-gray-700">
                  After World War II, Capt Prescillano Osial, a guerilla soldier who was then a Councilor of Guinobatan
                  petitioned Rep. Marcial O. Rañola to make Malacbalac an independent town. A bill was filed in Year
                  1939 and it was supported by the Congressman who succeeded Rep. Rañola in the name of Rep. Pio Duran.
                  It was on June 12, 1963 that House Bill No. 5335 was enacted into law, Republic Act No. 3817 creating
                  the Municipality of PIO DURAN within the Province of Albay.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Geographical Location Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Geographical Location</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-blue-950 mb-4">Boundaries</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-yellow-500 text-blue-950 rounded-full p-2 mr-3">
                        <i className="fas fa-arrow-up"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">North</h4>
                        <p>Municipalities of Ligao (now Ligao City) and Guinobatan</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-yellow-500 text-blue-950 rounded-full p-2 mr-3">
                        <i className="fas fa-arrow-down"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">South</h4>
                        <p>Panganiran Bay</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-yellow-500 text-blue-950 rounded-full p-2 mr-3">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">East</h4>
                        <p>Municipality of Donsol, Sorsogon Province</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-yellow-500 text-blue-950 rounded-full p-2 mr-3">
                        <i className="fas fa-arrow-left"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">West</h4>
                        <p>Municipality of Ligao and a barangay of Oas</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-yellow-500">
                  <h4 className="font-bold text-blue-950 mb-2">Accessibility</h4>
                  <p className="text-gray-700">
                    The Municipality is primarily accessible via land transportation in the 39 kms. Ligao- Pioduran
                    National Road and via sea transportation in Panganiran Bay.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80 flex items-center justify-center">
                    <div className="text-center">
                      <i className="fas fa-map-marked-alt text-5xl text-blue-950 mb-4"></i>
                      <p className="text-blue-950 font-semibold">Interactive Map of Pio Duran</p>
                      <p className="text-gray-600 text-sm mt-2">Geographical visualization coming soon</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-blue-950 px-4 py-2 rounded-lg font-bold">
                    <i className="fas fa-location-arrow mr-2"></i>Albay Province
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Historical Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Historical Timeline</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-950 hidden md:block"></div>

              <div className="space-y-12">
                {/* Event 1 */}
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 text-right">
                    <div className="bg-blue-950 text-white p-6 rounded-xl inline-block">
                      <div className="text-yellow-500 font-bold text-lg">1928</div>
                      <h3 className="text-xl font-bold mb-2">Early Settlement</h3>
                      <p>
                        Don Hilario Peñaflor and Prescillano Osial initiate the creation of Malacbalac as a separate
                        town.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="hidden md:block">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 border-4 border-blue-950 mx-auto"></div>
                    </div>
                    <div className="md:hidden flex justify-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 border-4 border-blue-950"></div>
                    </div>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 hidden md:block">
                    <div className="hidden md:block">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 border-4 border-blue-950 mx-auto"></div>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="md:hidden flex justify-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 border-4 border-blue-950"></div>
                    </div>
                    <div className="bg-blue-950 text-white p-6 rounded-xl inline-block">
                      <div className="text-yellow-500 font-bold text-lg">1939</div>
                      <h3 className="text-xl font-bold mb-2">Town Creation</h3>
                      <p>
                        Capt Prescillano Osial petitions Rep. Marcial O. Rañola to make Malacbalac an independent town.
                        A bill is filed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 text-right">
                    <div className="bg-blue-950 text-white p-6 rounded-xl inline-block">
                      <div className="text-yellow-500 font-bold text-lg">1963</div>
                      <h3 className="text-xl font-bold mb-2">Republic Act 3817</h3>
                      <p>
                        House Bill No. 5335 is enacted into law, creating the Municipality of PIO DURAN within the
                        Province of Albay.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="hidden md:block">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 border-4 border-blue-950 mx-auto"></div>
                    </div>
                    <div className="md:hidden flex justify-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 border-4 border-blue-950"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
