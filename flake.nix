{
  description = "Gestão de Beneficiários - DAPI/Dataprev";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            jdk17
            maven
            postgresql_16
            git
            httpie
          ];

          shellHook = ''
            echo ""
            echo "Gestão de Beneficiários - Dev Environment"
            echo "Java: $(java -version 2>&1 | head -1 )"
            echo "Maven: $(mvn -version 2>&1 | head -1)"
            echo ""
          '';
        };
      }
    );
}

