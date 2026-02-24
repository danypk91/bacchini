---
title: "Multiscale methods for plasma simulations"
icon: "🔬"
color: "cyan"
order: 3
---

I have devoted significant effort to combining different numerical approaches to construct new theoretical models of plasmas encompassing different physical regimes. This includes designing and applying a variety of multiscale, multiphysics tools, where e.g. fluid and particle simulations of plasmas can be run concurrently, exchanging information between the phenomena at large and small scales.

I recently developed the first <a href="https://doi.org/10.3847/1538-4365/acefba" target="_blank" rel="noopener noreferrer">relativistic, semi-implicit Particle-in-Cell</a> code for kinetic plasma simulations, that can significantly outperform standard (i.e. explicit) approaches. Among other works, I have also constructed <a href="https://doi.org/10.3847/1538-4365/abb604" target="_blank" rel="noopener noreferrer">hybrid algorithms to capture charged-particle motion</a> at wildly different scales, and produced the first <a href="https://doi.org/10.3847/1538-4365/aafcb3" target="_blank" rel="noopener noreferrer">particle-tracing simulations in a general-relativistic magnetohydrodynamic</a> setup.

My research group actively develops new methods to expand the reach of theoretical plasma physics by means of numerical simulations. For example, we have recently produced <a href="https://doi.org/10.3847/1538-4365/ad31a3" target="_blank" rel="noopener noreferrer">adaptive Particle-in-Cell methods</a> to capture, e.g., the expanding solar wind from first principles.

<div class="mt-6 flex flex-wrap items-start gap-4">
  <img src="/images/research/multiscale-pic.png" alt="Semi-implicit Particle-in-Cell simulation" class="h-40 rounded-lg object-cover" />
  <img src="/images/research/multiscale-hybrid.png" alt="Hybrid algorithm for charged-particle motion" class="h-32 rounded-lg object-cover" />
  <img src="/images/research/multiscale-adaptive.png" alt="Adaptive Particle-in-Cell method" class="h-32 rounded-lg object-cover" />
</div>
