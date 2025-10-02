import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Vision, Mission, Goals & Objectives - MDRRMO",
  description: "Our core principles that guide our purpose and direction",
}

export default function VisionMissionPage() {
  return (
    <div className="font-sans bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-950 text-white py-20 relative overflow-hidden">
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Vision, Mission, Goals <span className="text-yellow-500">&</span> Objectives
              </h1>
              <p className="text-xl mb-8">Our core principles that guide our purpose and direction</p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yellow-500 text-blue-950 px-6 py-3 rounded-full font-semibold">
                  <i className="fas fa-bullseye mr-2"></i>Strategic Focus
                </div>
                <div className="bg-blue-800 px-6 py-3 rounded-full font-semibold">
                  <i className="fas fa-rocket mr-2"></i>Growth Oriented
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-yellow-500 rounded-full opacity-20 absolute -top-6 -left-6"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-950 rounded-full opacity-20 absolute -bottom-6 -right-6"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-yellow-500 floating-animation">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop"
                    alt="Vision Mission Goals"
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
      <main className="container mx-auto px-4 py-16">
        {/* Vision Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Our Vision</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-10 bg-gradient-to-br from-blue-950 to-blue-800 text-white">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mb-6">
                    <i className="fas fa-eye text-blue-950 text-2xl"></i>
                  </div>
                  <h3 className="text-3xl font-bold mb-6">Vision Statement</h3>
                  <p className="text-xl leading-relaxed">
                    Leading catalyst for positive change, uniting technology and human potential for sustainable
                    communities.
                  </p>
                </div>
                <div className="bg-blue-900 bg-opacity-50 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3">Our Aspiration</h4>
                  <p>
                    We envision a future where innovation drives sustainable development and communities thrive through
                    collaborative efforts.
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex items-center justify-center p-10">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-900 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&h=800&fit=crop"
                      alt="Vision"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-blue-950 px-6 py-3 rounded-full font-bold">
                    <i className="fas fa-lightbulb mr-2"></i>Future Focused
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 flex items-center justify-center p-10 order-2 md:order-1">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-yellow-500 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=800&fit=crop"
                      alt="Mission"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-6 -left-6 bg-blue-950 text-yellow-500 px-6 py-3 rounded-full font-bold">
                    <i className="fas fa-handshake mr-2"></i>Partnership Driven
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-10 bg-gradient-to-br from-yellow-500 to-yellow-400 text-blue-950 order-1 md:order-2">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center mb-6">
                    <i className="fas fa-bullseye text-yellow-500 text-2xl"></i>
                  </div>
                  <h3 className="text-3xl font-bold mb-6">Mission Statement</h3>
                  <p className="text-xl leading-relaxed">
                    Empower businesses through innovative solutions that transform challenges into opportunities for
                    growth.
                  </p>
                </div>
                <div className="bg-yellow-600 bg-opacity-30 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3">Our Commitment</h4>
                  <p>
                    We are committed to delivering value-driven solutions that help organizations overcome obstacles and
                    achieve their strategic objectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Goal Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Our Goal</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-10 bg-gradient-to-br from-blue-950 to-blue-800 text-white">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mb-6">
                    <i className="fas fa-flag text-blue-950 text-2xl"></i>
                  </div>
                  <h3 className="text-3xl font-bold mb-6">Goal Statement</h3>
                  <p className="text-xl leading-relaxed">
                    Achieve excellence in every project with highest standards of quality, integrity, and customer
                    satisfaction.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-900 bg-opacity-50 p-4 rounded-xl">
                    <i className="fas fa-star text-yellow-500 text-xl mb-2"></i>
                    <h4 className="font-bold">Quality</h4>
                  </div>
                  <div className="bg-blue-900 bg-opacity-50 p-4 rounded-xl">
                    <i className="fas fa-shield-alt text-yellow-500 text-xl mb-2"></i>
                    <h4 className="font-bold">Integrity</h4>
                  </div>
                  <div className="bg-blue-900 bg-opacity-50 p-4 rounded-xl">
                    <i className="fas fa-smile text-yellow-500 text-xl mb-2"></i>
                    <h4 className="font-bold">Satisfaction</h4>
                  </div>
                  <div className="bg-blue-900 bg-opacity-50 p-4 rounded-xl">
                    <i className="fas fa-trophy text-yellow-500 text-xl mb-2"></i>
                    <h4 className="font-bold">Excellence</h4>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex items-center justify-center p-10">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-900 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop"
                      alt="Goal"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-blue-950 px-6 py-3 rounded-full font-bold">
                    <i className="fas fa-award mr-2"></i>Excellence Focused
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Our Objectives</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 flex items-center justify-center p-10 order-2 md:order-1">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 bg-yellow-500 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=800&fit=crop"
                      alt="Objectives"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-6 -left-6 bg-blue-950 text-yellow-500 px-6 py-3 rounded-full font-bold">
                    <i className="fas fa-tasks mr-2"></i>Action Oriented
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-10 bg-gradient-to-br from-yellow-500 to-yellow-400 text-blue-950 order-1 md:order-2">
                <div className="mb-8">
                  <div className="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center mb-6">
                    <i className="fas fa-list text-yellow-500 text-2xl"></i>
                  </div>
                  <h3 className="text-3xl font-bold mb-6">Strategic Objectives</h3>
                  <p className="text-xl leading-relaxed mb-8">
                    Our focused objectives drive our commitment to sustainable growth and community impact.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-950 rounded-full border-2 border-yellow-600"></div>
                    <h4 className="font-bold text-xl">Deliver innovative solutions</h4>
                    <p>
                      Continuously develop cutting-edge approaches to address evolving challenges and opportunities.
                    </p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-950 rounded-full border-2 border-yellow-600"></div>
                    <h4 className="font-bold text-xl">Foster long-term partnerships</h4>
                    <p>
                      Build enduring relationships with clients, stakeholders, and community members based on trust and
                      mutual benefit.
                    </p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-950 rounded-full border-2 border-yellow-600"></div>
                    <h4 className="font-bold text-xl">Maintain sustainable growth</h4>
                    <p>
                      Pursue expansion strategies that ensure long-term viability while preserving environmental and
                      social responsibility.
                    </p>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-950 rounded-full border-2 border-yellow-600"></div>
                    <h4 className="font-bold text-xl">Contribute to community</h4>
                    <p>
                      Actively participate in initiatives that enhance the well-being and development of our local
                      communities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              The fundamental principles that guide our actions and decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 card-hover border-t-4 border-blue-950">
              <div className="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center mb-6">
                <i className="fas fa-lightbulb text-yellow-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We embrace creativity and forward-thinking to develop groundbreaking solutions.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 card-hover border-t-4 border-yellow-500">
              <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mb-6">
                <i className="fas fa-handshake text-blue-950 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of teamwork and partnership to achieve greater outcomes.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 card-hover border-t-4 border-blue-950">
              <div className="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center mb-6">
                <i className="fas fa-balance-scale text-yellow-500 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Integrity</h3>
              <p className="text-gray-600">
                We conduct all our activities with honesty, transparency, and ethical standards.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 card-hover border-t-4 border-yellow-500">
              <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mb-6">
                <i className="fas fa-heart text-blue-950 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Community</h3>
              <p className="text-gray-600">We are committed to making a positive impact on the communities we serve.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
